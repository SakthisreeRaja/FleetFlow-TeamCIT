from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db
from app.models.maintenance import MaintenanceLog
from app.models.vehicle import Vehicle, VehicleStatus
from app.schemas.maintenance import MaintenanceLogCreate, MaintenanceLogResponse, MaintenanceLogUpdate

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])

@router.post("/", response_model=MaintenanceLogResponse)
def add_maintenance(data: MaintenanceLogCreate, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == data.vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    vehicle.status = VehicleStatus.IN_SHOP

    maintenance = MaintenanceLog(**data.model_dump())
    db.add(maintenance)
    db.commit()
    db.refresh(maintenance)

    return maintenance

@router.get("/", response_model=list[MaintenanceLogResponse])
def get_maintenance(vehicle_id: UUID = None, db: Session = Depends(get_db)):
    query = db.query(MaintenanceLog)
    if vehicle_id:
        query = query.filter(MaintenanceLog.vehicle_id == vehicle_id)
    return query.all()

@router.get("/{maintenance_id}", response_model=MaintenanceLogResponse)
def get_maintenance_record(maintenance_id: UUID, db: Session = Depends(get_db)):
    record = db.query(MaintenanceLog).filter(MaintenanceLog.id == maintenance_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Maintenance record not found")
    return record

@router.patch("/{maintenance_id}", response_model=MaintenanceLogResponse)
def update_maintenance(maintenance_id: UUID, maintenance_update: MaintenanceLogUpdate, db: Session = Depends(get_db)):
    db_maintenance = db.query(MaintenanceLog).filter(MaintenanceLog.id == maintenance_id).first()
    if not db_maintenance:
        raise HTTPException(status_code=404, detail="Maintenance record not found")
    
    # Update only provided fields
    update_data = maintenance_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_maintenance, field, value)
    
    db.commit()
    db.refresh(db_maintenance)
    return db_maintenance

@router.delete("/{maintenance_id}")
def delete_maintenance(maintenance_id: UUID, db: Session = Depends(get_db)):
    db_maintenance = db.query(MaintenanceLog).filter(MaintenanceLog.id == maintenance_id).first()
    if not db_maintenance:
        raise HTTPException(status_code=404, detail="Maintenance record not found")
    
    db.delete(db_maintenance)
    db.commit()
    return {"message": "Maintenance record deleted successfully"}
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db
from app.models.maintenance import MaintenanceLog
from app.models.vehicle import Vehicle, VehicleStatus
from app.schemas.maintenance import MaintenanceLogCreate, MaintenanceLogResponse

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
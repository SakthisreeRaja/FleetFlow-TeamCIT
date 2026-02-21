from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db
from app.models.vehicle import Vehicle, VehicleStatus
from app.schemas.vehicle import VehicleCreate, VehicleResponse, VehicleUpdate

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])

@router.post("/", response_model=VehicleResponse)
def create_vehicle(vehicle: VehicleCreate, db: Session = Depends(get_db)):
    # Check for duplicate vehicle_code or license_plate
    existing = db.query(Vehicle).filter(
        (Vehicle.vehicle_code == vehicle.vehicle_code) | 
        (Vehicle.license_plate == vehicle.license_plate)
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Vehicle with this code or license plate already exists")
    
    db_vehicle = Vehicle(**vehicle.model_dump())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

@router.get("/", response_model=list[VehicleResponse])
def get_vehicles(
    status: VehicleStatus = None,
    db: Session = Depends(get_db)
):
    query = db.query(Vehicle)
    if status:
        query = query.filter(Vehicle.status == status)
    return query.all()

@router.get("/{vehicle_id}", response_model=VehicleResponse)
def get_vehicle(vehicle_id: UUID, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@router.patch("/{vehicle_id}", response_model=VehicleResponse)
def update_vehicle(vehicle_id: UUID, vehicle_update: VehicleUpdate, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    for field, value in vehicle_update.model_dump(exclude_unset=True).items():
        setattr(vehicle, field, value)
    
    db.commit()
    db.refresh(vehicle)
    return vehicle

@router.delete("/{vehicle_id}")
def delete_vehicle(vehicle_id: UUID, db: Session = Depends(get_db)):
    from app.models.trip import Trip, TripStatus
    
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    # Check if vehicle has active trips
    active_trips = db.query(Trip).filter(
        Trip.vehicle_id == vehicle_id,
        Trip.status.in_([TripStatus.DISPATCHED, TripStatus.IN_PROGRESS])
    ).count()
    
    if active_trips > 0:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot delete vehicle with {active_trips} active trip(s). Complete trips first."
        )
    
    db.delete(vehicle)
    db.commit()
    return {"message": "Vehicle deleted successfully"}
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from uuid import UUID
from app.core.dependencies import get_db
from app.models.trip import Trip, TripStatus
from app.models.vehicle import Vehicle, VehicleStatus
from app.models.driver import Driver, DriverStatus
from app.schemas.trip import TripCreate, TripResponse, TripUpdate
from pydantic import BaseModel

router = APIRouter(prefix="/trips", tags=["Trips"])

class TripComplete(BaseModel):
    end_odometer: float

@router.post("/", response_model=TripResponse)
def create_trip(trip: TripCreate, db: Session = Depends(get_db)):
    # Check for duplicate trip_code
    existing = db.query(Trip).filter(Trip.trip_code == trip.trip_code).first()
    if existing:
        raise HTTPException(status_code=400, detail="Trip with this code already exists")
    
    vehicle = db.query(Vehicle).filter(Vehicle.id == trip.vehicle_id).first()
    driver = db.query(Driver).filter(Driver.id == trip.driver_id).first()

    if not vehicle or not driver:
        raise HTTPException(status_code=404, detail="Vehicle or Driver not found")

    if vehicle.status != VehicleStatus.AVAILABLE:
        raise HTTPException(status_code=400, detail="Vehicle not available")

    if driver.status != DriverStatus.OFF_DUTY:
        raise HTTPException(status_code=400, detail="Driver not available")

    if driver.license_expiry < date.today():
        raise HTTPException(status_code=400, detail="Driver license expired")

    if trip.cargo_weight_kg > vehicle.max_capacity_kg:
        raise HTTPException(status_code=400, detail="Cargo exceeds vehicle capacity")

    db_trip = Trip(
        **trip.model_dump(),
        status=TripStatus.DISPATCHED,
        start_odometer=vehicle.odometer_km
    )

    vehicle.status = VehicleStatus.ON_TRIP
    driver.status = DriverStatus.ON_TRIP

    db.add(db_trip)
    db.commit()
    db.refresh(db_trip)

    return db_trip

@router.patch("/{trip_id}/complete")
def complete_trip(trip_id: UUID, data: TripComplete, db: Session = Depends(get_db)):
    trip = db.query(Trip).filter(Trip.id == trip_id).first()

    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    vehicle = db.query(Vehicle).filter(Vehicle.id == trip.vehicle_id).first()
    driver = db.query(Driver).filter(Driver.id == trip.driver_id).first()

    trip.status = TripStatus.COMPLETED
    trip.end_odometer = data.end_odometer

    vehicle.status = VehicleStatus.AVAILABLE
    driver.status = DriverStatus.OFF_DUTY
    vehicle.odometer_km = data.end_odometer

    db.commit()

    return {"message": "Trip completed successfully", "trip_id": str(trip_id)}

@router.get("/", response_model=list[TripResponse])
def get_trips(status: TripStatus = None, db: Session = Depends(get_db)):
    query = db.query(Trip)
    if status:
        query = query.filter(Trip.status == status)
    return query.all()

@router.get("/{trip_id}", response_model=TripResponse)
def get_trip(trip_id: UUID, db: Session = Depends(get_db)):
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip
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
    try:
        # Check for duplicate trip_code
        existing = db.query(Trip).filter(Trip.trip_code == trip.trip_code).first()
        if existing:
            raise HTTPException(status_code=400, detail="Trip with this code already exists")
        
        vehicle = db.query(Vehicle).filter(Vehicle.id == trip.vehicle_id).first()
        driver = db.query(Driver).filter(Driver.id == trip.driver_id).first()

        if not vehicle:
            raise HTTPException(status_code=404, detail=f"Vehicle with ID {trip.vehicle_id} not found")
        
        if not driver:
            raise HTTPException(status_code=404, detail=f"Driver with ID {trip.driver_id} not found")

        if vehicle.status != VehicleStatus.AVAILABLE:
            raise HTTPException(status_code=400, detail=f"Vehicle {vehicle.license_plate} is not available (Status: {vehicle.status.value})")

        if driver.status in [DriverStatus.ON_TRIP, DriverStatus.SUSPENDED]:
            raise HTTPException(status_code=400, detail=f"Driver {driver.full_name} is not available (Status: {driver.status.value})")

        if driver.license_expiry < date.today():
            raise HTTPException(status_code=400, detail=f"Driver {driver.full_name}'s license expired on {driver.license_expiry}")

        if trip.cargo_weight_kg > vehicle.max_capacity_kg:
            raise HTTPException(status_code=400, detail=f"Cargo weight ({trip.cargo_weight_kg}kg) exceeds vehicle capacity ({vehicle.max_capacity_kg}kg)")

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
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        print(f"Error creating trip: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create trip: {str(e)}")

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

@router.patch("/{trip_id}", response_model=TripResponse)
def update_trip(trip_id: UUID, trip_update: TripUpdate, db: Session = Depends(get_db)):
    db_trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not db_trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    # Prevent updating completed trips
    if db_trip.status == TripStatus.COMPLETED:
        raise HTTPException(status_code=400, detail="Cannot update completed trip")

    # Update only provided fields
    update_data = trip_update.model_dump(exclude_unset=True)

    # Validate cargo weight if that field is present in update payload.
    cargo_weight = update_data.get("cargo_weight_kg")
    if cargo_weight is not None:
        vehicle = db.query(Vehicle).filter(Vehicle.id == db_trip.vehicle_id).first()
        if vehicle and cargo_weight > vehicle.max_capacity_kg:
            raise HTTPException(status_code=400, detail="Cargo exceeds vehicle capacity")

    # Check trip_code uniqueness only if that field is present in update payload.
    trip_code = update_data.get("trip_code")
    if trip_code and trip_code != db_trip.trip_code:
        existing = db.query(Trip).filter(Trip.trip_code == trip_code).first()
        if existing:
            raise HTTPException(status_code=400, detail="Trip with this code already exists")

    for field, value in update_data.items():
        setattr(db_trip, field, value)
    
    db.commit()
    db.refresh(db_trip)
    return db_trip

@router.delete("/{trip_id}")
def delete_trip(trip_id: UUID, db: Session = Depends(get_db)):
    db_trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not db_trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    # Only allow deleting trips that haven't started
    if db_trip.status != TripStatus.DISPATCHED:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete trip that is in progress or completed"
        )
    
    # Free up vehicle and driver
    vehicle = db.query(Vehicle).filter(Vehicle.id == db_trip.vehicle_id).first()
    driver = db.query(Driver).filter(Driver.id == db_trip.driver_id).first()
    
    if vehicle and vehicle.status == VehicleStatus.ON_TRIP:
        vehicle.status = VehicleStatus.AVAILABLE
    if driver and driver.status == DriverStatus.ON_TRIP:
        driver.status = DriverStatus.OFF_DUTY
    
    db.delete(db_trip)
    db.commit()
    return {"message": "Trip deleted successfully"}

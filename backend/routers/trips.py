from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from database import SessionLocal
import models, schemas

router = APIRouter(prefix="/trips", tags=["Trips"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_trip(trip: schemas.TripCreate, db: Session = Depends(get_db)):

    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == trip.vehicle_id).first()
    driver = db.query(models.Driver).filter(models.Driver.id == trip.driver_id).first()

    if not vehicle or not driver:
        raise HTTPException(status_code=404, detail="Vehicle or Driver not found")

    if vehicle.status != "Available":
        raise HTTPException(status_code=400, detail="Vehicle not available")

    if driver.status != "Available":
        raise HTTPException(status_code=400, detail="Driver not available")

    if driver.license_expiry < date.today():
        raise HTTPException(status_code=400, detail="Driver license expired")

    if trip.cargo_weight > vehicle.max_capacity:
        raise HTTPException(status_code=400, detail="Cargo exceeds capacity")

    db_trip = models.Trip(**trip.dict(), status="Dispatched")

    vehicle.status = "OnTrip"
    driver.status = "OnTrip"

    db.add(db_trip)
    db.commit()
    db.refresh(db_trip)

    return db_trip


@router.patch("/{trip_id}/complete")
def complete_trip(trip_id: int, data: schemas.TripComplete, db: Session = Depends(get_db)):

    trip = db.query(models.Trip).filter(models.Trip.id == trip_id).first()

    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == trip.vehicle_id).first()
    driver = db.query(models.Driver).filter(models.Driver.id == trip.driver_id).first()

    trip.status = "Completed"
    trip.end_odometer = data.end_odometer

    vehicle.status = "Available"
    driver.status = "Available"
    vehicle.odometer = data.end_odometer

    db.commit()

    return {"message": "Trip completed successfully"}


@router.get("/")
def get_trips(db: Session = Depends(get_db)):
    return db.query(models.Trip).all()
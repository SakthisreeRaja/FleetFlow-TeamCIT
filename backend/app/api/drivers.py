from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db
from app.models.driver import Driver
from app.models.trip import Trip, TripStatus
from app.schemas.driver import DriverCreate, DriverResponse, DriverUpdate

router = APIRouter(prefix="/drivers", tags=["Drivers"])

@router.post("/", response_model=DriverResponse)
def create_driver(driver: DriverCreate, db: Session = Depends(get_db)):
    # Check if license number already exists
    existing = db.query(Driver).filter(Driver.license_number == driver.license_number).first()
    if existing:
        raise HTTPException(status_code=400, detail="Driver with this license number already exists")
    
    db_driver = Driver(**driver.model_dump())
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver

@router.get("/", response_model=list[DriverResponse])
def get_drivers(db: Session = Depends(get_db)):
    return db.query(Driver).all()

@router.get("/{driver_id}", response_model=DriverResponse)
def get_driver(driver_id: UUID, db: Session = Depends(get_db)):
    driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if not driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    return driver

@router.get("/{driver_id}/performance")
def driver_performance(driver_id: UUID, db: Session = Depends(get_db)):
    total = db.query(Trip).filter(Trip.driver_id == driver_id).count()
    completed = db.query(Trip).filter(
        Trip.driver_id == driver_id,
        Trip.status == TripStatus.COMPLETED
    ).count()

    completion_rate = (completed / total) * 100 if total else 0

    return {
        "driver_id": str(driver_id),
        "total_trips": total,
        "completed_trips": completed,
        "completion_rate": round(completion_rate, 2)
    }

@router.patch("/{driver_id}", response_model=DriverResponse)
def update_driver(driver_id: UUID, driver_update: DriverUpdate, db: Session = Depends(get_db)):
    db_driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    
    # Check license number uniqueness if it's being updated
    if driver_update.license_number and driver_update.license_number != db_driver.license_number:
        existing = db.query(Driver).filter(Driver.license_number == driver_update.license_number).first()
        if existing:
            raise HTTPException(status_code=400, detail="Driver with this license number already exists")
    
    # Update only provided fields
    update_data = driver_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_driver, field, value)
    
    db.commit()
    db.refresh(db_driver)
    return db_driver

@router.delete("/{driver_id}")
def delete_driver(driver_id: UUID, db: Session = Depends(get_db)):
    db_driver = db.query(Driver).filter(Driver.id == driver_id).first()
    if not db_driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    
    # Check if driver has active trips
    active_trips = db.query(Trip).filter(
        Trip.driver_id == driver_id,
        Trip.status.in_([TripStatus.DISPATCHED, TripStatus.IN_PROGRESS])
    ).count()
    
    if active_trips > 0:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot delete driver with {active_trips} active trip(s). Complete or reassign trips first."
        )
    
    db.delete(db_driver)
    db.commit()
    return {"message": "Driver deleted successfully"}
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
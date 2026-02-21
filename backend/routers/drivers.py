from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas

router = APIRouter(prefix="/drivers", tags=["Drivers"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):
    db_driver = models.Driver(**driver.dict())
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver


@router.get("/")
def get_drivers(db: Session = Depends(get_db)):
    return db.query(models.Driver).all()


@router.get("/{driver_id}/performance")
def driver_performance(driver_id: int, db: Session = Depends(get_db)):
    total = db.query(models.Trip).filter(models.Trip.driver_id == driver_id).count()
    completed = db.query(models.Trip).filter(
        models.Trip.driver_id == driver_id,
        models.Trip.status == "Completed"
    ).count()

    completion_rate = (completed / total) * 100 if total else 0

    return {
        "completion_rate": round(completion_rate, 2)
    }
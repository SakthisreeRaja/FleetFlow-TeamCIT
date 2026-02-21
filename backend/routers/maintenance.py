from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas

router = APIRouter(prefix="/maintenance", tags=["Maintenance"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def add_maintenance(data: schemas.MaintenanceCreate, db: Session = Depends(get_db)):

    vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == data.vehicle_id).first()
    vehicle.status = "InShop"

    maintenance = models.Maintenance(**data.dict())
    db.add(maintenance)
    db.commit()

    return maintenance


@router.get("/")
def get_maintenance(db: Session = Depends(get_db)):
    return db.query(models.Maintenance).all()
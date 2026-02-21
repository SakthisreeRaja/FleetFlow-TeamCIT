from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from utils.query_utils import apply_filters, apply_sorting, apply_group_by
import models, schemas

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def create_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)):
    db_vehicle = models.Vehicle(**vehicle.dict())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle


@router.get("/")
def get_vehicles(
    status: str = None,
    sort_by: str = None,
    order: str = "asc",
    group_by: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Vehicle)
    query = apply_filters(query, models.Vehicle, {"status": status})
    query = apply_sorting(query, models.Vehicle, sort_by, order)
    query = apply_group_by(query, models.Vehicle, group_by)
    return query.all()
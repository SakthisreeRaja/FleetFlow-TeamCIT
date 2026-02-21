from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):

    active_fleet = db.query(models.Vehicle)\
        .filter(models.Vehicle.status == "OnTrip").count()

    maintenance_alerts = db.query(models.Vehicle)\
        .filter(models.Vehicle.status == "InShop").count()

    pending_cargo = db.query(models.Trip)\
        .filter(models.Trip.status == "Draft").count()

    total_vehicles = db.query(models.Vehicle).count()

    utilization_rate = (active_fleet / total_vehicles) * 100 if total_vehicles else 0

    return {
        "active_fleet": active_fleet,
        "maintenance_alerts": maintenance_alerts,
        "pending_cargo": pending_cargo,
        "utilization_rate": round(utilization_rate, 2)
    }
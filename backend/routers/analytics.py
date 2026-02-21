from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import SessionLocal
import models

router = APIRouter(prefix="/analytics", tags=["Analytics"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/fleet")
def fleet_analytics(db: Session = Depends(get_db)):

    total_revenue = db.query(func.sum(models.Trip.revenue)).scalar() or 0
    total_fuel = db.query(func.sum(models.Expense.cost)).scalar() or 0
    total_maintenance = db.query(func.sum(models.Maintenance.cost)).scalar() or 0

    return {
        "total_revenue": total_revenue,
        "total_fuel_cost": total_fuel,
        "total_maintenance_cost": total_maintenance,
        "fleet_net_profit": total_revenue - (total_fuel + total_maintenance)
    }
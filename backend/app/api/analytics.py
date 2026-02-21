from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.dependencies import get_db
from app.models.trip import Trip
from app.models.expense import Expense
from app.models.fuel import FuelLog
from app.models.maintenance import MaintenanceLog

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/fleet")
def fleet_analytics(db: Session = Depends(get_db)):
    total_revenue = db.query(func.sum(Trip.revenue)).scalar() or 0
    total_fuel = db.query(func.sum(FuelLog.cost)).scalar() or 0
    total_maintenance = db.query(func.sum(MaintenanceLog.cost)).scalar() or 0

    return {
        "total_revenue": float(total_revenue),
        "total_fuel_cost": float(total_fuel),
        "total_maintenance_cost": float(total_maintenance),
        "fleet_net_profit": float(total_revenue - (total_fuel + total_maintenance))
    }
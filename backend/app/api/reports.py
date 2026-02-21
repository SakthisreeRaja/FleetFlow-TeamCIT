from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.dependencies import get_db
from app.models.trip import Trip
from app.models.fuel import FuelLog
from app.models.maintenance import MaintenanceLog
from app.models.expense import Expense

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/monthly")
def monthly_report(db: Session = Depends(get_db)):
    """Generate monthly financial report"""
    total_revenue = db.query(func.sum(Trip.revenue)).scalar() or 0
    total_fuel = db.query(func.sum(FuelLog.cost)).scalar() or 0
    total_maintenance = db.query(func.sum(MaintenanceLog.cost)).scalar() or 0
    total_expenses = db.query(func.sum(Expense.amount)).scalar() or 0
    
    net_profit = total_revenue - (total_fuel + total_maintenance + total_expenses)

    return {
        "metrics": {
            "total_revenue": float(total_revenue),
            "fuel_cost": float(total_fuel),
            "maintenance_cost": float(total_maintenance),
            "other_expenses": float(total_expenses),
            "net_profit": float(net_profit)
        },
        "trip_count": db.query(Trip).count(),
        "fuel_entries": db.query(FuelLog).count(),
        "maintenance_entries": db.query(MaintenanceLog).count()
    }

@router.get("/fleet-performance")
def fleet_performance(db: Session = Depends(get_db)):
    """Get fleet-wide performance metrics"""
    from app.models.vehicle import Vehicle, VehicleStatus
    from app.models.driver import Driver
    
    total_vehicles = db.query(Vehicle).count()
    active_vehicles = db.query(Vehicle).filter(Vehicle.status == VehicleStatus.ON_TRIP).count()
    in_maintenance = db.query(Vehicle).filter(Vehicle.status == VehicleStatus.IN_SHOP).count()
    
    total_drivers = db.query(Driver).count()
    
    return {
        "fleet_size": total_vehicles,
        "active_vehicles": active_vehicles,
        "vehicles_in_maintenance": in_maintenance,
        "available_vehicles": total_vehicles - active_vehicles - in_maintenance,
        "total_drivers": total_drivers,
        "utilization_rate": round((active_vehicles / total_vehicles * 100) if total_vehicles else 0, 2)
    }
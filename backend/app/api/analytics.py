from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.dependencies import get_db
from app.models.trip import Trip
from app.models.expense import Expense
from app.models.fuel import FuelLog
from app.models.maintenance import MaintenanceLog
from app.models.vehicle import Vehicle

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

@router.get("/fuel-efficiency")
def fuel_efficiency_analytics(db: Session = Depends(get_db)):
    """Get fuel efficiency data per vehicle"""
    # Query fuel logs grouped by vehicle
    fuel_data = db.query(
        Vehicle.license_plate,
        Vehicle.vehicle_type,
        func.sum(FuelLog.liters).label('total_liters'),
        func.count(FuelLog.id).label('refuel_count')
    ).join(FuelLog).group_by(Vehicle.id, Vehicle.license_plate, Vehicle.vehicle_type).all()
    
    # Get trip distances for each vehicle
    trip_data = db.query(
        Vehicle.id,
        func.sum(Trip.end_odometer - Trip.start_odometer).label('total_distance')
    ).join(Trip).filter(Trip.end_odometer.isnot(None)).group_by(Vehicle.id).all()
    
    trip_dict = {str(t.id): float(t.total_distance) if t.total_distance else 0 for t in trip_data}
    
    result = []
    for fuel in fuel_data:
        vehicle = db.query(Vehicle).filter(Vehicle.license_plate == fuel.license_plate).first()
        total_distance = trip_dict.get(str(vehicle.id), 0)
        efficiency = (total_distance / fuel.total_liters) if fuel.total_liters > 0 and total_distance > 0 else 0
        
        result.append({
            "vehicle": fuel.license_plate,
            "vehicle_type": fuel.vehicle_type,
            "efficiency": round(efficiency, 2),
            "total_liters": float(fuel.total_liters),
            "total_distance": total_distance,
            "refuel_count": fuel.refuel_count
        })
    
    return result

@router.get("/vehicle-costs")
def vehicle_cost_analytics(db: Session = Depends(get_db)):
    """Get top costliest vehicles based on fuel and maintenance"""
    # Query costs per vehicle
    vehicles = db.query(Vehicle).all()
    
    result = []
    for vehicle in vehicles:
        fuel_cost = db.query(func.sum(FuelLog.cost)).filter(FuelLog.vehicle_id == vehicle.id).scalar() or 0
        maintenance_cost = db.query(func.sum(MaintenanceLog.cost)).filter(MaintenanceLog.vehicle_id == vehicle.id).scalar() or 0
        expense_cost = db.query(func.sum(Expense.amount)).filter(Expense.vehicle_id == vehicle.id).scalar() or 0
        
        total_cost = float(fuel_cost) + float(maintenance_cost) + float(expense_cost)
        
        result.append({
            "vehicle_id": str(vehicle.id),
            "license_plate": vehicle.license_plate,
            "vehicle_type": vehicle.vehicle_type,
            "fuel_cost": float(fuel_cost),
            "maintenance_cost": float(maintenance_cost),
            "expense_cost": float(expense_cost),
            "total_cost": total_cost
        })
    
    # Sort by total cost descending and return top 5
    result.sort(key=lambda x: x['total_cost'], reverse=True)
    return result[:5]
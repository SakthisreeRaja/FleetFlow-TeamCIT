from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.models.vehicle import Vehicle, VehicleStatus
from app.models.trip import Trip, TripStatus
from app.models.driver import Driver, DriverStatus

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db)):
    active_fleet = db.query(Vehicle).filter(Vehicle.status == VehicleStatus.ON_TRIP).count()
    maintenance_alerts = db.query(Vehicle).filter(Vehicle.status == VehicleStatus.IN_SHOP).count()
    pending_trips = db.query(Trip).filter(Trip.status == TripStatus.DISPATCHED).count()
    total_vehicles = db.query(Vehicle).count()
    total_drivers = db.query(Driver).count()
    active_drivers = db.query(Driver).filter(Driver.status == DriverStatus.ON_TRIP).count()

    utilization_rate = (active_fleet / total_vehicles) * 100 if total_vehicles else 0

    return {
        "active_fleet": active_fleet,
        "maintenance_alerts": maintenance_alerts,
        "pending_trips": pending_trips,
        "total_vehicles": total_vehicles,
        "total_drivers": total_drivers,
        "active_drivers": active_drivers,
        "utilization_rate": round(utilization_rate, 2)
    }
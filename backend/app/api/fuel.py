from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db
from app.models.fuel import FuelLog
from app.models.trip import Trip
from app.models.vehicle import Vehicle
from app.schemas.fuel import FuelLogCreate, FuelLogResponse

router = APIRouter(prefix="/fuel", tags=["Fuel"])

@router.post("/", response_model=FuelLogResponse)
def add_fuel_log(data: FuelLogCreate, db: Session = Depends(get_db)):
    # Validate trip exists
    trip = db.query(Trip).filter(Trip.id == data.trip_id).first()
    if not trip:
        raise HTTPException(status_code=404, detail=f"Trip with id {data.trip_id} not found")
    
    # Validate vehicle exists
    vehicle = db.query(Vehicle).filter(Vehicle.id == data.vehicle_id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail=f"Vehicle with id {data.vehicle_id} not found")
    
    fuel_log = FuelLog(**data.model_dump())
    db.add(fuel_log)
    db.commit()
    db.refresh(fuel_log)
    return fuel_log

@router.get("/", response_model=list[FuelLogResponse])
def get_fuel_logs(trip_id: UUID = None, vehicle_id: UUID = None, db: Session = Depends(get_db)):
    query = db.query(FuelLog)
    if trip_id:
        query = query.filter(FuelLog.trip_id == trip_id)
    if vehicle_id:
        query = query.filter(FuelLog.vehicle_id == vehicle_id)
    return query.all()

@router.get("/{fuel_id}", response_model=FuelLogResponse)
def get_fuel_log(fuel_id: UUID, db: Session = Depends(get_db)):
    log = db.query(FuelLog).filter(FuelLog.id == fuel_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Fuel log not found")
    return log

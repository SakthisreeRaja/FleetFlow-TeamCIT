from pydantic import BaseModel
from uuid import UUID
from datetime import date

class FuelLogBase(BaseModel):
    trip_id: UUID
    vehicle_id: UUID
    liters: float
    cost: float
    fuel_date: date

class FuelLogCreate(FuelLogBase):
    pass

class FuelLogUpdate(BaseModel):
    liters: float | None = None
    cost: float | None = None
    fuel_date: date | None = None

class FuelLogResponse(FuelLogBase):
    id: UUID

    class Config:
        from_attributes = True

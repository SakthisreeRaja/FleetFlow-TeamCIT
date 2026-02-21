from pydantic import BaseModel
from uuid import UUID
from app.models.trip import TripStatus

class TripBase(BaseModel):
    trip_code: str
    vehicle_id: UUID
    driver_id: UUID
    origin: str
    destination: str
    cargo_weight_kg: float

class TripCreate(TripBase):
    revenue: float | None = None
    start_odometer: float | None = None

class TripUpdate(BaseModel):
    status: TripStatus | None = None
    end_odometer: float | None = None
    revenue: float | None = None

class TripResponse(TripBase):
    id: UUID
    revenue: float | None
    start_odometer: float | None
    end_odometer: float | None
    status: TripStatus

    class Config:
        from_attributes = True

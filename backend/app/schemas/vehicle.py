from pydantic import BaseModel
from uuid import UUID
from app.models.vehicle import VehicleStatus

class VehicleBase(BaseModel):
    vehicle_code: str
    license_plate: str
    model: str
    vehicle_type: str
    max_capacity_kg: float
    acquisition_cost: float

class VehicleCreate(VehicleBase):
    odometer_km: float = 0

class VehicleUpdate(BaseModel):
    vehicle_code: str | None = None
    license_plate: str | None = None
    model: str | None = None
    vehicle_type: str | None = None
    max_capacity_kg: float | None = None
    odometer_km: float | None = None
    acquisition_cost: float | None = None
    status: VehicleStatus | None = None

class VehicleResponse(VehicleBase):
    id: UUID
    odometer_km: float
    status: VehicleStatus

    class Config:
        from_attributes = True

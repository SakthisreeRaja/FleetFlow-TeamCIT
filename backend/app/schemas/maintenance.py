from pydantic import BaseModel
from uuid import UUID
from datetime import date

class MaintenanceLogBase(BaseModel):
    vehicle_id: UUID
    service_type: str
    description: str | None = None
    cost: float
    service_date: date

class MaintenanceLogCreate(MaintenanceLogBase):
    pass

class MaintenanceLogUpdate(BaseModel):
    service_type: str | None = None
    description: str | None = None
    cost: float | None = None
    service_date: date | None = None

class MaintenanceLogResponse(MaintenanceLogBase):
    id: UUID

    class Config:
        from_attributes = True

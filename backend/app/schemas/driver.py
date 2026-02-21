from pydantic import BaseModel
from uuid import UUID
from datetime import date
from app.models.driver import DriverStatus

class DriverBase(BaseModel):
    full_name: str
    phone: str
    license_number: str
    license_category: str
    license_expiry: date

class DriverCreate(DriverBase):
    pass

class DriverUpdate(BaseModel):
    full_name: str | None = None
    phone: str | None = None
    license_number: str | None = None
    license_category: str | None = None
    license_expiry: date | None = None
    safety_score: float | None = None
    completion_rate: float | None = None
    complaints: int | None = None
    status: DriverStatus | None = None

class DriverResponse(DriverBase):
    id: UUID
    safety_score: float
    completion_rate: float
    complaints: int
    status: DriverStatus

    class Config:
        from_attributes = True

import uuid, enum
from sqlalchemy import String, Enum, Numeric
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class VehicleStatus(str, enum.Enum):
    AVAILABLE = "AVAILABLE"
    ON_TRIP = "ON_TRIP"
    IN_SHOP = "IN_SHOP"

class Vehicle(Base):
    __tablename__ = "vehicles"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    license_plate: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    model: Mapped[str] = mapped_column(String(100))
    vehicle_type: Mapped[str] = mapped_column(String(50))
    max_capacity_kg: Mapped[float] = mapped_column(Numeric(10,2), nullable=False)
    odometer_km: Mapped[float] = mapped_column(Numeric(12,2), default=0)
    acquisition_cost: Mapped[float] = mapped_column(Numeric(12,2))

    status: Mapped[VehicleStatus] = mapped_column(Enum(VehicleStatus), default=VehicleStatus.AVAILABLE)

    trips = relationship("Trip", back_populates="vehicle")
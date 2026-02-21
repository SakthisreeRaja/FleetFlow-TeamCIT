import uuid, enum
from sqlalchemy import String, Enum, Numeric, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Optional
from app.core.database import Base

class TripStatus(str, enum.Enum):
    DISPATCHED = "DISPATCHED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"

class Trip(Base):
    __tablename__ = "trips"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    trip_code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"))
    driver_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("drivers.id"))

    origin: Mapped[str] = mapped_column(Text, nullable=False)
    destination: Mapped[str] = mapped_column(Text, nullable=False)
    cargo_weight_kg: Mapped[float] = mapped_column(Numeric(10,2), nullable=False)

    revenue: Mapped[Optional[float]] = mapped_column(Numeric(12,2), nullable=True)
    start_odometer: Mapped[Optional[float]] = mapped_column(Numeric(12,2), nullable=True)
    end_odometer: Mapped[Optional[float]] = mapped_column(Numeric(12,2), nullable=True)

    status: Mapped[TripStatus] = mapped_column(Enum(TripStatus), default=TripStatus.DISPATCHED)

    vehicle = relationship("Vehicle", back_populates="trips")
    driver = relationship("Driver", back_populates="trips")
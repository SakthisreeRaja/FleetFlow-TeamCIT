import uuid, enum
from sqlalchemy import String, Date, Enum, Numeric, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class DriverStatus(str, enum.Enum):
    ON_DUTY = "ON_DUTY"
    OFF_DUTY = "OFF_DUTY"
    ON_TRIP = "ON_TRIP"
    SUSPENDED = "SUSPENDED"

class Driver(Base):
    __tablename__ = "drivers"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name: Mapped[str] = mapped_column(String(150), nullable=False)
    phone: Mapped[str] = mapped_column(String(20))
    license_number: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    license_category: Mapped[str] = mapped_column(String(50))
    license_expiry: Mapped[str] = mapped_column(Date, nullable=False)

    safety_score: Mapped[float] = mapped_column(Numeric(5,2), default=100)
    completion_rate: Mapped[float] = mapped_column(Numeric(5,2), default=0)
    complaints: Mapped[int] = mapped_column(Integer, default=0)

    status: Mapped[DriverStatus] = mapped_column(Enum(DriverStatus), default=DriverStatus.OFF_DUTY)

    trips = relationship("Trip", back_populates="driver")
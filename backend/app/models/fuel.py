import uuid
from sqlalchemy import Numeric, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class FuelLog(Base):
    __tablename__ = "fuel_logs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    trip_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("trips.id"))
    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"))

    liters: Mapped[float] = mapped_column(Numeric(10,2), nullable=False)
    cost: Mapped[float] = mapped_column(Numeric(12,2), nullable=False)
    fuel_date: Mapped[str] = mapped_column(Date, nullable=False)
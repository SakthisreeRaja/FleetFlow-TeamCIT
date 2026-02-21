import uuid
from sqlalchemy import String, Numeric, Date, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class MaintenanceLog(Base):
    __tablename__ = "maintenance_logs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"))
    service_type: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str] = mapped_column(Text)
    cost: Mapped[float] = mapped_column(Numeric(12,2), nullable=False)
    service_date: Mapped[str] = mapped_column(Date, nullable=False)
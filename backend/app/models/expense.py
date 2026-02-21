import uuid
from sqlalchemy import Numeric, Date, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Expense(Base):
    __tablename__ = "expenses"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    trip_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("trips.id"))
    vehicle_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("vehicles.id"))

    expense_type: Mapped[str] = mapped_column(String(100))
    amount: Mapped[float] = mapped_column(Numeric(12,2), nullable=False)
    expense_date: Mapped[str] = mapped_column(Date, nullable=False)
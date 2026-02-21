from pydantic import BaseModel
from uuid import UUID
from datetime import date

class ExpenseBase(BaseModel):
    trip_id: UUID
    vehicle_id: UUID
    expense_type: str
    amount: float
    expense_date: date

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(BaseModel):
    expense_type: str | None = None
    amount: float | None = None
    expense_date: date | None = None

class ExpenseResponse(ExpenseBase):
    id: UUID

    class Config:
        from_attributes = True

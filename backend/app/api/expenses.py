from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db
from app.models.expense import Expense
from app.schemas.expense import ExpenseCreate, ExpenseResponse

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post("/", response_model=ExpenseResponse)
def add_expense(data: ExpenseCreate, db: Session = Depends(get_db)):
    expense = Expense(**data.model_dump())
    db.add(expense)
    db.commit()
    db.refresh(expense)
    return expense

@router.get("/", response_model=list[ExpenseResponse])
def get_expenses(trip_id: UUID = None, vehicle_id: UUID = None, db: Session = Depends(get_db)):
    query = db.query(Expense)
    if trip_id:
        query = query.filter(Expense.trip_id == trip_id)
    if vehicle_id:
        query = query.filter(Expense.vehicle_id == vehicle_id)
    return query.all()

@router.get("/{expense_id}", response_model=ExpenseResponse)
def get_expense(expense_id: UUID, db: Session = Depends(get_db)):
    expense = db.query(Expense).filter(Expense.id == expense_id).first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return expense
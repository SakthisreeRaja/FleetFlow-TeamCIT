from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas

router = APIRouter(prefix="/expenses", tags=["Expenses"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def add_expense(data: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    expense = models.Expense(**data.dict())
    db.add(expense)
    db.commit()
    return expense


@router.get("/")
def get_expenses(db: Session = Depends(get_db)):
    return db.query(models.Expense).all()
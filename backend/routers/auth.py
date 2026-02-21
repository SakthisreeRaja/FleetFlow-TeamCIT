from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas
from security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/register")
def register(user: schemas.RegisterSchema, db: Session = Depends(get_db)):

    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed = hash_password(user.password)

    db_user = models.User(
        employee_id=user.employee_id,
        name=user.name,
        email=user.email,
        password=hashed,
        role=user.role
    )

    db.add(db_user)
    db.commit()
    return {"message": "User registered successfully"}


@router.post("/login")
def login(data: schemas.LoginSchema, db: Session = Depends(get_db)):

    user = db.query(models.User).filter(models.User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({
        "user_id": user.id,
        "role": user.role
    })

    return {"access_token": token}
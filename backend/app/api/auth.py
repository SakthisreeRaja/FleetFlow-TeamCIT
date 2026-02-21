from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from uuid import UUID
from app.core.dependencies import get_db
from app.models.user import User
from app.models.role import Role
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

class RegisterSchema(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role_id: UUID

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

@router.post("/register")
def register(user: RegisterSchema, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    # Check if role exists
    role = db.query(Role).filter(Role.id == user.role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")

    hashed = hash_password(user.password)

    db_user = User(
        full_name=user.full_name,
        email=user.email,
        password_hash=hashed,
        role_id=user.role_id
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return {"message": "User registered successfully", "user_id": str(db_user.id)}

@router.post("/login", response_model=TokenResponse)
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(status_code=403, detail="User account is inactive")

    token = create_access_token({
        "user_id": str(user.id),
        "email": user.email,
        "role_id": str(user.role_id)
    })

    return {"access_token": token, "token_type": "bearer"}
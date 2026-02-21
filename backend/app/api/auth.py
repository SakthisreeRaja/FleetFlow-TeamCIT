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
    user: dict

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
    
    # Create token for auto-login after registration
    token = create_access_token({
        "user_id": str(db_user.id),
        "email": db_user.email,
        "role_id": str(db_user.role_id)
    })
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(db_user.id),
            "full_name": db_user.full_name,
            "email": db_user.email,
            "role": role.name
        }
    }

@router.post("/login", response_model=TokenResponse)
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    # Check if user exists
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No account found with this email",
        )
    
    # Check password
    if not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(status_code=403, detail="User account is inactive")

    # Get role information
    role = db.query(Role).filter(Role.id == user.role_id).first()

    token = create_access_token({
        "user_id": str(user.id),
        "email": user.email,
        "role_id": str(user.role_id)
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "full_name": user.full_name,
            "email": user.email,
            "role": role.name if role else "Unknown"
        }
    }
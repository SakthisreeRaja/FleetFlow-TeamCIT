from pydantic import BaseModel, EmailStr
from uuid import UUID

class UserBase(BaseModel):
    full_name: str
    email: EmailStr
    role_id: UUID

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    full_name: str | None = None
    email: EmailStr | None = None
    role_id: UUID | None = None
    is_active: bool | None = None

class UserResponse(UserBase):
    id: UUID
    is_active: bool

    class Config:
        from_attributes = True

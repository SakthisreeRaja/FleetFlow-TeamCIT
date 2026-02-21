from pydantic import BaseModel
from uuid import UUID

class RoleBase(BaseModel):
    name: str

class RoleCreate(RoleBase):
    pass

class RoleUpdate(BaseModel):
    name: str | None = None

class RoleResponse(RoleBase):
    id: UUID

    class Config:
        from_attributes = True

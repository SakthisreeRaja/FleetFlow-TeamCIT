from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID
from app.core.dependencies import get_db
from app.models.role import Role
from app.schemas.role import RoleCreate, RoleResponse, RoleUpdate

router = APIRouter(prefix="/roles", tags=["Roles"])

@router.post("/", response_model=RoleResponse)
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    # Check if role already exists
    existing = db.query(Role).filter(Role.name == role.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Role already exists")
    
    db_role = Role(**role.model_dump())
    db.add(db_role)
    db.commit()
    db.refresh(db_role)
    return db_role

@router.get("/", response_model=list[RoleResponse])
def get_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()

@router.get("/{role_id}", response_model=RoleResponse)
def get_role(role_id: UUID, db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    return role

@router.patch("/{role_id}", response_model=RoleResponse)
def update_role(role_id: UUID, role_update: RoleUpdate, db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    
    for field, value in role_update.model_dump(exclude_unset=True).items():
        setattr(role, field, value)
    
    db.commit()
    db.refresh(role)
    return role

@router.delete("/{role_id}")
def delete_role(role_id: UUID, db: Session = Depends(get_db)):
    role = db.query(Role).filter(Role.id == role_id).first()
    if not role:
        raise HTTPException(status_code=404, detail="Role not found")
    
    db.delete(role)
    db.commit()
    return {"message": "Role deleted successfully"}

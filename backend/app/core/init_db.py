from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.role import Role
from app.models import role, user, vehicle, driver, trip, maintenance, fuel, expense

def init_roles(db: Session):
    """Initialize default roles if they don't exist"""
    default_roles = [
        "Manager",
        "Dispatcher",
        "Safety Officer",
        "Financial Analyst"
    ]
    
    for role_name in default_roles:
        existing_role = db.query(Role).filter(Role.name == role_name).first()
        if not existing_role:
            new_role = Role(name=role_name)
            db.add(new_role)
            print(f"✓ Created role: {role_name}")
        else:
            print(f"→ Role already exists: {role_name}")
    
    db.commit()
    print("✓ Roles initialization complete!\n")

def init_database():
    """Initialize database with default data"""
    print("\n🔧 Initializing FleetFlow Database...")
    print("=" * 50)
    
    # Create all tables
    print("\n📦 Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ All tables created/verified!")
    
    # Initialize roles
    db = SessionLocal()
    try:
        print("\n👥 Initializing roles...")
        init_roles(db)
        print("=" * 50)
        print("✅ Database initialization successful!\n")
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.rollback()
        raise
    finally:
        db.close()

from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.database import SessionLocal, engine, Base
from app.models.role import Role
from app.models import role, user, vehicle, driver, trip, maintenance, fuel, expense


def init_roles(db: Session):
    """Initialize default roles if they don't exist."""
    default_roles = [
        "Manager",
        "Dispatcher",
        "Safety Officer",
        "Financial Analyst",
    ]

    for role_name in default_roles:
        existing_role = db.query(Role).filter(Role.name == role_name).first()
        if not existing_role:
            db.add(Role(name=role_name))
            print(f"[OK] Created role: {role_name}")
        else:
            print(f"[INFO] Role already exists: {role_name}")

    db.commit()
    print("[OK] Roles initialization complete.\n")


def ensure_schema_compatibility(db: Session):
    """Apply lightweight DB compatibility fixes for existing environments."""
    end_odometer_nullable = db.execute(
        text(
            """
            SELECT is_nullable
            FROM information_schema.columns
            WHERE table_schema = 'public'
              AND table_name = 'trips'
              AND column_name = 'end_odometer'
            """
        )
    ).scalar()

    # Existing databases may have this column as NOT NULL from older schema.
    if end_odometer_nullable == "NO":
        print("[INFO] Updating schema: making trips.end_odometer nullable...")
        db.execute(text("ALTER TABLE trips ALTER COLUMN end_odometer DROP NOT NULL"))
        db.commit()
        print("[OK] Schema update complete: trips.end_odometer is nullable.")


def init_database():
    """Initialize database with default data."""
    print("\n[INFO] Initializing FleetFlow Database...")
    print("=" * 50)

    # Create all tables
    print("\n[INFO] Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("[OK] All tables created/verified.")

    # Apply schema compatibility fixes and initialize defaults
    db = SessionLocal()
    try:
        ensure_schema_compatibility(db)
        print("\n[INFO] Initializing roles...")
        init_roles(db)
        print("=" * 50)
        print("[OK] Database initialization successful.\n")
    except Exception as e:
        print(f"[ERROR] Database initialization failed: {e}")
        db.rollback()
        raise
    finally:
        db.close()

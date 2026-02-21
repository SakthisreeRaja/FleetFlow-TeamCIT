"""
Script to clean up old roles and keep only the required ones
"""
from app.core.database import SessionLocal
from app.models.role import Role
from app.models.user import User

def cleanup_roles():
    """Remove old roles and keep only the required ones"""
    db = SessionLocal()
    
    # Roles to keep
    required_roles = ["Manager", "Dispatcher", "Safety Officer", "Financial Analyst"]
    
    try:
        # Get all roles
        all_roles = db.query(Role).all()
        
        print("\n🧹 Cleaning up roles...")
        print("=" * 50)
        
        # Check for users
        users_count = db.query(User).count()
        if users_count > 0:
            print(f"⚠️  Found {users_count} users in the database")
            print("⚠️  WARNING: Deleting users to allow role cleanup!")
            print()
            
            # Delete all users
            db.query(User).delete()
            db.commit()
            print("✅ All users deleted")
            print()
        
        for role in all_roles:
            if role.name not in required_roles:
                print(f"❌ Deleting role: {role.name}")
                db.delete(role)
            else:
                print(f"✅ Keeping role: {role.name}")
        
        db.commit()
        print("=" * 50)
        print("✅ Cleanup complete!\n")
        
        # Show remaining roles
        remaining_roles = db.query(Role).all()
        print("📋 Remaining roles:")
        for role in remaining_roles:
            print(f"   • {role.name}")
        print()
        
    except Exception as e:
        print(f"❌ Error during cleanup: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    cleanup_roles()

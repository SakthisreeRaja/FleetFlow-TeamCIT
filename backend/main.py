from fastapi import FastAPI
from contextlib import asynccontextmanager

# IMPORTANT: import all models BEFORE create_all
from app.models import role, user, vehicle, driver, trip, maintenance, fuel, expense

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables when app starts
    try:
        from app.core.database import Base, engine
        Base.metadata.create_all(bind=engine)
        print("✅ Database tables created successfully")
    except Exception as e:
        print(f"⚠️  Database connection failed: {e}")
        print("💡 App will start but database operations will fail")
    yield
    # Shutdown: cleanup if needed

app = FastAPI(title="FleetFlow API 🚛", lifespan=lifespan)

@app.get("/")
def root():
    return {"message": "FleetFlow running successfully 🚀"}
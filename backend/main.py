from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# IMPORTANT: import all models BEFORE create_all
from app.models import role, user, vehicle, driver, trip, maintenance, fuel, expense

# Import database components
from app.core.database import engine, Base

# Import API routers
from app.api import auth, users, roles, drivers, vehicles, trips, expenses, maintenance, fuel as fuel_api, dashboard, analytics, reports

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="FleetFlow API 🚛")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(roles.router)
app.include_router(drivers.router)
app.include_router(vehicles.router)
app.include_router(trips.router)
app.include_router(expenses.router)
app.include_router(maintenance.router)
app.include_router(fuel_api.router)
app.include_router(dashboard.router)
app.include_router(analytics.router)
app.include_router(reports.router)

@app.get("/")
def root():
    return {"message": "FleetFlow running successfully 🚀", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
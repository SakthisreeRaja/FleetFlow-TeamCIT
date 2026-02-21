from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.init_db import init_database
from app.api import (
    analytics,
    auth,
    dashboard,
    drivers,
    expenses,
    fuel as fuel_api,
    maintenance,
    reports,
    roles,
    trips,
    users,
    vehicles,
)

# Initialize database (creates tables and seeds default data)
init_database()

app = FastAPI(title="FleetFlow API")

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
    return {"message": "FleetFlow running successfully", "version": "1.0.0"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database
from database import engine, Base

# Import models so tables are created
import models

# Import routers
from routers import (
    auth,
    vehicles,
    drivers,
    trips,
    maintenance,
    expenses,
    dashboard,
    analytics,
    reports
)

# ==============================
# 🚀 Create FastAPI App
# ==============================

app = FastAPI(
    title="FleetFlow API",
    description="Modular Fleet & Logistics Management System Backend",
    version="1.0.0"
)

# ==============================
# 🌍 CORS (Allow Frontend Access)
# ==============================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For hackathon, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================
# 🗄️ Create Database Tables
# ==============================

Base.metadata.create_all(bind=engine)

# ==============================
# 📡 Register Routers
# ==============================

app.include_router(auth.router)
app.include_router(vehicles.router)
app.include_router(drivers.router)
app.include_router(trips.router)
app.include_router(maintenance.router)
app.include_router(expenses.router)
app.include_router(dashboard.router)
app.include_router(analytics.router)
app.include_router(reports.router)

# ==============================
# ❤️ Health Check Endpoint
# ==============================

@app.get("/")
def root():
    return {
        "message": "FleetFlow Backend Running Successfully 🚀"
    }
from pydantic import BaseModel
from datetime import date
from typing import Optional


# ==============================
# AUTH
# ==============================

class RegisterSchema(BaseModel):
    employee_id: str
    name: str
    email: str
    password: str
    role: str


class LoginSchema(BaseModel):
    email: str
    password: str


# ==============================
# VEHICLE
# ==============================

class VehicleCreate(BaseModel):
    name: str
    model: str
    license_plate: str
    max_capacity: float
    odometer: float
    acquisition_cost: float


# ==============================
# DRIVER
# ==============================

class DriverCreate(BaseModel):
    name: str
    license_number: str
    license_expiry: date


# ==============================
# TRIP
# ==============================

class TripCreate(BaseModel):
    vehicle_id: int
    driver_id: int
    origin: str
    destination: str
    trip_type: str
    cargo_weight: float
    estimated_fuel: float
    start_odometer: float
    revenue: float


class TripComplete(BaseModel):
    end_odometer: float


# ==============================
# MAINTENANCE
# ==============================

class MaintenanceCreate(BaseModel):
    vehicle_id: int
    description: str
    cost: float
    date: date


# ==============================
# EXPENSE
# ==============================

class ExpenseCreate(BaseModel):
    vehicle_id: int
    liters: float
    cost: float
    date: date
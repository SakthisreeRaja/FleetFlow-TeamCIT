from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum


# ==============================
# ENUMS
# ==============================

class UserRole(str, enum.Enum):
    manager = "Manager"
    dispatcher = "Dispatcher"
    safety = "SafetyOfficer"
    finance = "FinancialAnalyst"


class VehicleStatus(str, enum.Enum):
    available = "Available"
    on_trip = "OnTrip"
    in_shop = "InShop"
    retired = "OutOfService"


class DriverStatus(str, enum.Enum):
    available = "Available"
    on_trip = "OnTrip"
    off_duty = "OffDuty"
    suspended = "Suspended"


class TripStatus(str, enum.Enum):
    draft = "Draft"
    dispatched = "Dispatched"
    completed = "Completed"
    cancelled = "Cancelled"


# ==============================
# USER
# ==============================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True)
    name = Column(String)
    email = Column(String, unique=True)
    password = Column(String)
    role = Column(String)  # Using String instead of Enum for SQLite compatibility


# ==============================
# VEHICLE
# ==============================

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    model = Column(String)
    license_plate = Column(String, unique=True)
    max_capacity = Column(Float)
    odometer = Column(Float)
    status = Column(String, default="Available")  # Using String instead of Enum for SQLite compatibility
    acquisition_cost = Column(Float)


# ==============================
# DRIVER
# ==============================

class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    license_number = Column(String)
    license_expiry = Column(Date)
    status = Column(String, default="Available")  # Using String instead of Enum for SQLite compatibility
    safety_score = Column(Float, default=100)


# ==============================
# TRIP
# ==============================

class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)

    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    driver_id = Column(Integer, ForeignKey("drivers.id"))

    origin = Column(String)
    destination = Column(String)
    trip_type = Column(String)

    cargo_weight = Column(Float)
    estimated_fuel = Column(Float)

    start_odometer = Column(Float)
    end_odometer = Column(Float, nullable=True)

    revenue = Column(Float)
    status = Column(String, default="Draft")  # Using String instead of Enum for SQLite compatibility


# ==============================
# MAINTENANCE
# ==============================

class Maintenance(Base):
    __tablename__ = "maintenance"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    description = Column(String)
    cost = Column(Float)
    date = Column(Date)


# ==============================
# EXPENSE
# ==============================

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    liters = Column(Float)
    cost = Column(Float)
    date = Column(Date)
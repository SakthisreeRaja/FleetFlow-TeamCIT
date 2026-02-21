from fastapi import APIRouter, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import SessionLocal
import models
import pandas as pd
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.units import inch
import os

router = APIRouter(prefix="/reports", tags=["Reports"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/monthly/excel")
def export_monthly_excel(db: Session = Depends(get_db)):

    total_revenue = db.query(func.sum(models.Trip.revenue)).scalar() or 0
    total_fuel = db.query(func.sum(models.Expense.cost)).scalar() or 0
    total_maintenance = db.query(func.sum(models.Maintenance.cost)).scalar() or 0
    net_profit = total_revenue - (total_fuel + total_maintenance)

    data = {
        "Metric": ["Total Revenue", "Fuel Cost", "Maintenance Cost", "Net Profit"],
        "Amount": [total_revenue, total_fuel, total_maintenance, net_profit]
    }

    df = pd.DataFrame(data)

    file_path = "monthly_report.xlsx"
    df.to_excel(file_path, index=False)

    return FileResponse(
        file_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename="Monthly_Report.xlsx"
    )

@router.get("/monthly/pdf")
def export_monthly_pdf(db: Session = Depends(get_db)):

    total_revenue = db.query(func.sum(models.Trip.revenue)).scalar() or 0
    total_fuel = db.query(func.sum(models.Expense.cost)).scalar() or 0
    total_maintenance = db.query(func.sum(models.Maintenance.cost)).scalar() or 0
    net_profit = total_revenue - (total_fuel + total_maintenance)

    file_path = "monthly_report.pdf"
    doc = SimpleDocTemplate(file_path)
    elements = []

    styles = getSampleStyleSheet()
    elements.append(Paragraph("FleetFlow Monthly Financial Report", styles["Title"]))
    elements.append(Spacer(1, 0.5 * inch))

    data = [
        ["Metric", "Amount"],
        ["Total Revenue", str(total_revenue)],
        ["Fuel Cost", str(total_fuel)],
        ["Maintenance Cost", str(total_maintenance)],
        ["Net Profit", str(net_profit)]
    ]

    table = Table(data)
    table.setStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
        ('GRID', (0, 0), (-1, -1), 1, colors.black)
    ])

    elements.append(table)
    doc.build(elements)

    return FileResponse(
        file_path,
        media_type="application/pdf",
        filename="Monthly_Report.pdf"
    )


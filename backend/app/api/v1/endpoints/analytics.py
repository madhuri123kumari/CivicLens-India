from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.models.incident import Incident

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/public-stats")
async def public_stats(session: AsyncSession = Depends(get_db)):
    total = (await session.execute(select(func.count(Incident.id)))).scalar_one()
    resolved = (await session.execute(select(func.count(Incident.id)).where(Incident.status.in_(["RESOLVED","CLOSED"])))).scalar_one()
    pending = total - resolved
    active = (await session.execute(select(func.count(Incident.id)).where(Incident.status.in_(["ASSIGNED","IN_PROGRESS","VERIFICATION"])))) .scalar_one()
    return {"total_reports": total, "resolved_reports": resolved, "pending_reports": pending, "active_reports": active}

@router.get("/authority-stats")
async def authority_stats(session: AsyncSession = Depends(get_db)):
    total = (await session.execute(select(func.count(Incident.id)))).scalar_one()
    active = (await session.execute(select(func.count(Incident.id)).where(Incident.status.in_(["ASSIGNED","IN_PROGRESS"])))).scalar_one()
    resolved = (await session.execute(select(func.count(Incident.id)).where(Incident.status.in_(["RESOLVED","CLOSED"])))).scalar_one()
    return {"total_incidents": total, "active_incidents": active, "resolved_incidents": resolved, "pending_incidents": total-resolved}

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import current_user
from app.core.database import get_db
from app.schemas.incident import IncidentCreate, IncidentRead
from app.services.incident_service import create_incident
from app.services.priority_engine import calculate_priority
from app.repositories.incident_repo import get_by_civic_id

router = APIRouter(prefix="/incidents", tags=["incidents"])

@router.post("", response_model=IncidentRead)
async def create(payload: IncidentCreate, session: AsyncSession = Depends(get_db), user=Depends(current_user)):
    priority = calculate_priority(payload.category, payload.description)
    incident = await create_incident(session, title=payload.title, description=payload.description, category=payload.category,
        latitude=payload.latitude, longitude=payload.longitude, priority=priority.level, priority_score=priority.score,
        citizen_id=user.get("sub"))
    return incident

@router.get("/{civic_id}", response_model=IncidentRead)
async def get(civic_id: str, session: AsyncSession = Depends(get_db)):
    incident = await get_by_civic_id(session, civic_id)
    if not incident:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return incident

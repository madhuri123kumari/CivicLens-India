from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.incident import Incident

VALID_TRANSITIONS = {
    "SUBMITTED": {"VERIFIED", "ASSIGNED", "REOPENED"},
    "VERIFIED": {"ASSIGNED", "REOPENED"},
    "ASSIGNED": {"IN_PROGRESS", "REOPENED"},
    "IN_PROGRESS": {"RESOLVED", "REOPENED"},
    "RESOLVED": {"VERIFICATION", "REOPENED"},
    "VERIFICATION": {"CLOSED", "REOPENED"},
    "CLOSED": {"REOPENED"},
    "REOPENED": {"VERIFIED", "ASSIGNED", "IN_PROGRESS"},
}

async def transition(session: AsyncSession, civic_id: str, new_status: str) -> Incident:
    result = await session.execute(select(Incident).where(Incident.civic_id == civic_id))
    incident = result.scalar_one_or_none()
    if not incident:
        raise ValueError("Incident not found")
    if new_status not in VALID_TRANSITIONS.get(incident.status, set()):
        raise ValueError(f"Invalid status transition: {incident.status} -> {new_status}")
    incident.status = new_status
    await session.commit()
    await session.refresh(incident)
    return incident

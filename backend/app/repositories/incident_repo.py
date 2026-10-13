from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.incident import Incident

async def create(session: AsyncSession, incident: Incident) -> Incident:
    session.add(incident)
    await session.commit()
    await session.refresh(incident)
    return incident

async def get_by_civic_id(session: AsyncSession, civic_id: str) -> Incident | None:
    result = await session.execute(select(Incident).where(Incident.civic_id == civic_id))
    return result.scalar_one_or_none()

async def count(session: AsyncSession) -> int:
    result = await session.execute(select(Incident.id))
    return len(result.scalars().all())

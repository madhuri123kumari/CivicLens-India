from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.geography import State, District

async def list_states(session: AsyncSession):
    result = await session.execute(select(State).order_by(State.name))
    return list(result.scalars().all())

async def find_district(session: AsyncSession, code: str):
    result = await session.execute(select(District).where(District.code == code))
    return result.scalar_one_or_none()

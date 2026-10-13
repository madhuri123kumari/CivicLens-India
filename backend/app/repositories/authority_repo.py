from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.authority import Authority

async def list_active(session: AsyncSession):
    result = await session.execute(select(Authority).where(Authority.active.is_(True)).order_by(Authority.name))
    return list(result.scalars().all())

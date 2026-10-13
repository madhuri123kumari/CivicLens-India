from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.incident import Incident
from app.repositories.incident_repo import create

def generate_civic_id(state_code: str = "IN", year: int | None = None) -> str:
    y = year or datetime.utcnow().year
    suffix = datetime.utcnow().strftime("%m%d%H%M%S%f")[-10:]
    return f"CIV-{y}-{state_code.upper()}-{suffix}"

async def create_incident(session: AsyncSession, **data) -> Incident:
    incident = Incident(civic_id=generate_civic_id(), **data)
    return await create(session, incident)

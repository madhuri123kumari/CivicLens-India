from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import require_roles
from app.core.database import get_db
from app.schemas.resolution import ResolutionCreate
from app.services.resolution_service import transition

router = APIRouter(prefix="/resolutions", tags=["resolutions"])

@router.post("")
async def resolve(payload: ResolutionCreate, session: AsyncSession = Depends(get_db), user=Depends(require_roles("OFFICER","SUPERVISOR","DISTRICT_ADMIN","STATE_ADMIN","NATIONAL_ADMIN"))):
    try:
        incident = await transition(session, payload.incident_id, payload.status)
        return {"civic_id": incident.civic_id, "status": incident.status}
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

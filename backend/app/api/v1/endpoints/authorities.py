from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import require_roles
from app.core.database import get_db
from app.repositories.authority_repo import list_active

router = APIRouter(prefix="/authorities", tags=["authorities"])

@router.get("")
async def authorities(session: AsyncSession = Depends(get_db), user=Depends(require_roles("OFFICER","SUPERVISOR","DISTRICT_ADMIN","STATE_ADMIN","NATIONAL_ADMIN","AUDITOR"))):
    return await list_active(session)

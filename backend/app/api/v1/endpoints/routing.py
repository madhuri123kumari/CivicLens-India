from fastapi import APIRouter
from app.services.routing_engine import resolve_authority

router = APIRouter(prefix="/routing", tags=["routing"])

@router.get("/preview")
async def preview(state_code: str | None = None, district_code: str | None = None, category: str = "OTHER"):
    result = await resolve_authority(state_code=state_code, district_code=district_code, category=category)
    return result.__dict__

from fastapi import APIRouter
from app.schemas.geo import ReverseGeoRequest, ReverseGeoResponse

router = APIRouter(prefix="/geo", tags=["geo"])

@router.post("/reverse", response_model=ReverseGeoResponse)
async def reverse(payload: ReverseGeoRequest):
    return ReverseGeoResponse(
        available=False,
        message="Reverse geocoding provider is not configured. Set GEOCODING_PROVIDER and GEOCODING_API_KEY."
    )

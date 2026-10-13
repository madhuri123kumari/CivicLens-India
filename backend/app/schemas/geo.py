from pydantic import BaseModel, Field
class ReverseGeoRequest(BaseModel):
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
class ReverseGeoResponse(BaseModel):
    available: bool
    state: str | None = None
    district: str | None = None
    city: str | None = None
    message: str

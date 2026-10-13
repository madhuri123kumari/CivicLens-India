from datetime import datetime
from pydantic import BaseModel, Field

class IncidentCreate(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    description: str = Field(min_length=3, max_length=10000)
    category: str = Field(default="OTHER", max_length=80)
    latitude: float | None = Field(default=None, ge=-90, le=90)
    longitude: float | None = Field(default=None, ge=-180, le=180)

class IncidentRead(BaseModel):
    id: str
    civic_id: str
    title: str
    description: str
    category: str
    status: str
    priority: str
    priority_score: int
    latitude: float | None
    longitude: float | None
    state: str | None
    district: str | None
    created_at: datetime
    updated_at: datetime
    model_config = {"from_attributes": True}

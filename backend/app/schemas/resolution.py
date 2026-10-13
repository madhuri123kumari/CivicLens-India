from pydantic import BaseModel, Field
class ResolutionCreate(BaseModel):
    incident_id: str
    notes: str | None = Field(default=None, max_length=5000)
    status: str = "RESOLVED"

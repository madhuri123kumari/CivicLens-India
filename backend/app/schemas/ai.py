from pydantic import BaseModel, Field

class TextAnalysisRequest(BaseModel):
    text: str = Field(min_length=2, max_length=10000)

class TranslateRequest(BaseModel):
    texts: dict[str, str]
    target_language: str = Field(min_length=2, max_length=20)

class AiAnalysisResponse(BaseModel):
    available: bool
    status: str
    category: str | None = None
    severity: str | None = None
    confidence: float | None = None
    summary: str | None = None
    recommended_action: str | None = None
    reasons: list[str] = []
    model_version: str | None = None

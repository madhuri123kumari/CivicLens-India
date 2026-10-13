from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from app.schemas.ai import AiAnalysisResponse, TextAnalysisRequest, TranslateRequest
from app.services.ai_provider import analyze_incident, translate_bundle
from app.core.config import settings

router = APIRouter(prefix="/ai", tags=["ai"])
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}

@router.post("/analyze-text", response_model=AiAnalysisResponse)
async def analyze_text(payload: TextAnalysisRequest):
    try:
        result = await analyze_incident(payload.text)
        return AiAnalysisResponse(available=True, status="completed", **result)
    except Exception as exc:
        return AiAnalysisResponse(available=False, status="unavailable", reasons=[str(exc)])

@router.post("/analyze-incident", response_model=AiAnalysisResponse)
async def analyze_incident_endpoint(description: str = Form(..., min_length=2, max_length=10000), image: UploadFile | None = File(default=None)):
    image_bytes = None
    image_mime = None
    if image:
        if image.content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(status_code=415, detail="Only JPEG, PNG and WebP images are supported for AI vision analysis.")
        image_bytes = await image.read()
        if len(image_bytes) > settings.max_upload_mb * 1024 * 1024:
            raise HTTPException(status_code=413, detail="Image exceeds configured size limit.")
        image_mime = image.content_type
    try:
        result = await analyze_incident(description, image_bytes, image_mime)
        return AiAnalysisResponse(available=True, status="completed", **result)
    except Exception as exc:
        return AiAnalysisResponse(available=False, status="unavailable", reasons=[str(exc)])

@router.post("/translate")
async def translate(payload: TranslateRequest):
    if payload.target_language == "en":
        return {"translations": payload.texts, "model_version": "identity"}
    if len(payload.texts) > 100 or sum(len(v) for v in payload.texts.values()) > 20000:
        raise HTTPException(status_code=413, detail="Translation bundle is too large.")
    try:
        translations = await translate_bundle(payload.texts, payload.target_language)
        return {"translations": translations, "model_version": settings.ai_model}
    except Exception as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

import base64
import json
from typing import Any
import httpx
from app.core.config import settings

SYSTEM_PROMPT = """You are the CivicLens India civic-intelligence assistant. Analyse citizen reports conservatively.
Return ONLY valid JSON with keys: category, severity, confidence, summary, recommended_action, reasons.
Allowed categories: ROAD_DAMAGE, GARBAGE, STREETLIGHT, WATER, DRAINAGE, WATERLOGGING, TRAFFIC, PUBLIC_SAFETY, PARKS, ENCROACHMENT, OTHER.
Allowed severity: LOW, MEDIUM, HIGH, CRITICAL.
Confidence must be a number from 0 to 1. Do not invent location, government department, law, or facts not present in the evidence.
If the evidence is ambiguous, use OTHER and lower confidence. Reasons must be short factual observations."""

async def _chat(messages: list[dict[str, Any]], temperature: float = 0) -> dict[str, Any]:
    if not settings.ai_api_key:
        raise RuntimeError("AI provider is not configured. Set AI_API_KEY in the backend environment.")
    url = f"{settings.ai_base_url.rstrip('/')}/chat/completions"
    headers = {"Authorization": f"Bearer {settings.ai_api_key}", "Content-Type": "application/json"}
    body = {
        "model": settings.ai_model,
        "messages": messages,
        "temperature": temperature,
        "response_format": {"type": "json_object"},
    }
    async with httpx.AsyncClient(timeout=settings.ai_timeout_seconds) as client:
        response = await client.post(url, headers=headers, json=body)
        response.raise_for_status()
        payload = response.json()
    content = payload["choices"][0]["message"]["content"]
    return json.loads(content)

async def analyze_incident(description: str, image_bytes: bytes | None = None, image_mime: str | None = None) -> dict[str, Any]:
    user_content: list[dict[str, Any]] = [{"type": "text", "text": description}]
    if image_bytes and image_mime:
        encoded = base64.b64encode(image_bytes).decode("ascii")
        user_content.append({"type": "image_url", "image_url": {"url": f"data:{image_mime};base64,{encoded}"}})
    result = await _chat([
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_content},
    ])
    result["model_version"] = settings.ai_model
    return result

async def translate_bundle(texts: dict[str, str], target_language: str) -> dict[str, str]:
    if target_language == "en":
        return texts
    language_name = settings.language_names.get(target_language, target_language)
    prompt = "Translate every value to %s. Preserve the keys exactly. Return only JSON. Keep civic/public-service terminology clear and formal for Indian citizens.\n%s" % (language_name, json.dumps(texts, ensure_ascii=False))
    result = await _chat([
        {"role": "system", "content": "You are a professional Indian public-service translator. Never change JSON keys."},
        {"role": "user", "content": prompt},
    ], temperature=0.1)
    return {str(k): str(v) for k, v in result.items()}

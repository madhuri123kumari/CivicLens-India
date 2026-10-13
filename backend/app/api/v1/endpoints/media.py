from pathlib import Path
from uuid import uuid4
from fastapi import APIRouter, File, HTTPException, UploadFile
from app.core.config import settings

router = APIRouter(prefix="/media", tags=["media"])
ALLOWED = {"image/jpeg","image/png","image/webp","video/mp4","audio/webm","audio/wav"}

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED:
        raise HTTPException(status_code=415, detail="Unsupported media type")
    settings_dir = Path(settings.upload_dir)
    settings_dir.mkdir(parents=True, exist_ok=True)
    suffix = Path(file.filename or "").suffix.lower()
    destination = settings_dir / f"{uuid4().hex}{suffix}"
    data = await file.read()
    if len(data) > settings.max_upload_mb * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File exceeds configured size limit")
    destination.write_bytes(data)
    return {"stored": True, "filename": destination.name, "content_type": file.content_type, "size": len(data)}

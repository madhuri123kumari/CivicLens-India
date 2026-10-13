from pathlib import Path
from uuid import uuid4
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import current_user
from app.core.config import settings
from app.core.database import get_db
from app.models.incident import Incident
from app.models.media import IncidentMedia

router=APIRouter(prefix="/incidents",tags=["incident-media"])
ALLOWED={"image/jpeg","image/png","image/webp","video/mp4"}

@router.post("/{civic_id}/media")
async def upload_media(civic_id:str,file:UploadFile=File(...),session:AsyncSession=Depends(get_db),user=Depends(current_user)):
    incident=(await session.execute(select(Incident).where(Incident.civic_id==civic_id))).scalar_one_or_none()
    if not incident: raise HTTPException(status_code=404,detail="Complaint not found")
    if incident.citizen_id and incident.citizen_id!=user.get("sub"): raise HTTPException(status_code=403,detail="You cannot add evidence to this complaint")
    if file.content_type not in ALLOWED: raise HTTPException(status_code=415,detail="Unsupported evidence type")
    data=await file.read()
    if len(data)>settings.max_upload_mb*1024*1024: raise HTTPException(status_code=413,detail="Evidence file is too large")
    folder=Path(settings.upload_dir)/"incidents"/civic_id; folder.mkdir(parents=True,exist_ok=True)
    suffix=Path(file.filename or "").suffix.lower(); destination=folder/f"{uuid4().hex}{suffix}"; destination.write_bytes(data)
    media=IncidentMedia(incident_id=incident.id,storage_key=str(destination),media_type=file.content_type); session.add(media); await session.commit()
    return {"stored":True,"media_id":media.id,"civic_id":civic_id,"size":len(data)}

from datetime import datetime
from sqlalchemy import DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Resolution(Base):
    __tablename__ = "resolutions"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    incident_id: Mapped[str] = mapped_column(String(36), index=True)
    status: Mapped[str] = mapped_column(String(30))
    notes: Mapped[str | None] = mapped_column(Text(), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)

class ResolutionEvidence(Base):
    __tablename__ = "resolution_evidence"
    id: Mapped[str] = mapped_column(String(36), primary_key=True)
    resolution_id: Mapped[str] = mapped_column(String(36), index=True)
    media_url: Mapped[str] = mapped_column(Text())
    evidence_type: Mapped[str] = mapped_column(String(30))

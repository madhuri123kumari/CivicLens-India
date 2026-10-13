from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class SlaPolicy(Base):
    __tablename__ = "sla_policies"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    category: Mapped[str] = mapped_column(String(80), index=True)
    priority: Mapped[str] = mapped_column(String(20), index=True)
    target_hours: Mapped[int] = mapped_column(Integer)

class SlaEvent(Base):
    __tablename__ = "sla_events"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    incident_id: Mapped[str] = mapped_column(String(36), index=True)
    event_type: Mapped[str] = mapped_column(String(30))

from sqlalchemy import Boolean, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Authority(Base):
    __tablename__ = "authorities"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(200))
    authority_type: Mapped[str] = mapped_column(String(60))
    state_code: Mapped[str | None] = mapped_column(String(20), index=True)
    district_code: Mapped[str | None] = mapped_column(String(30), index=True)
    active: Mapped[bool] = mapped_column(Boolean, default=True)

class Department(Base):
    __tablename__ = "departments"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    authority_id: Mapped[int] = mapped_column(Integer, index=True)
    name: Mapped[str] = mapped_column(String(150))

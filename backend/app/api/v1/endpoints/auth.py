from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import current_user
from app.core.database import get_db
from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["auth"])

class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

@router.post("/register")
async def register(payload: RegisterRequest, session: AsyncSession = Depends(get_db)):
    exists = await session.execute(select(User).where(User.email == payload.email))
    if exists.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Email already registered")
    user = User(full_name=payload.full_name, email=payload.email, password_hash=hash_password(payload.password))
    session.add(user)
    await session.commit()
    return {"id": user.id, "email": user.email, "role": user.role}

@router.post("/login")
async def login(payload: LoginRequest, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"access_token": create_access_token(user.id, user.role), "token_type": "bearer", "role": user.role}

@router.get("/me")
async def me(user=Depends(current_user)):
    return user

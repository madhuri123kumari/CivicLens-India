from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.router import api_router
from app.core.config import settings
from app.core.exceptions import CivicLensError, civiclens_exception_handler

@asynccontextmanager
async def lifespan(app: FastAPI):
    Path(settings.upload_dir).mkdir(parents=True, exist_ok=True)
    yield

app = FastAPI(title=settings.app_name, version="0.1.0", description="National civic technology prototype.", lifespan=lifespan)
app.add_exception_handler(CivicLensError, civiclens_exception_handler)
app.add_middleware(CORSMiddleware, allow_origins=settings.cors_list, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(api_router, prefix=settings.api_prefix)

@app.get("/health")
async def health():
    return {"status":"ok","service":"backend-core"}

@app.get("/ready")
async def ready():
    return {"status":"ready"}

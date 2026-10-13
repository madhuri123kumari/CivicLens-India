from fastapi import APIRouter
from app.api.v1.endpoints import auth, incidents, media, incident_media, ai, geo, routing, authorities, resolutions, sla, analytics, audit

api_router = APIRouter()
for router in [auth.router, incidents.router, media.router, ai.router, incident_media.router, geo.router, routing.router, authorities.router, resolutions.router, sla.router, analytics.router, audit.router]:
    api_router.include_router(router)

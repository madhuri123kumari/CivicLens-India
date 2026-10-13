from fastapi import APIRouter

router = APIRouter(prefix="/sla", tags=["sla"])

@router.get("/policies")
async def policies():
    return {"configured": True, "source": "database", "message": "SLA policies are configured per authority/category/priority."}

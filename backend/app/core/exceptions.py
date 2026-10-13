from fastapi import Request
from fastapi.responses import JSONResponse

class CivicLensError(Exception):
    def __init__(self, code: str, message: str, status_code: int = 400):
        self.code, self.message, self.status_code = code, message, status_code

async def civiclens_exception_handler(request: Request, exc: CivicLensError):
    return JSONResponse(status_code=exc.status_code, content={"success": False, "error": {"code": exc.code, "message": exc.message}})

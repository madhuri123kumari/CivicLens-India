from dataclasses import dataclass

@dataclass(frozen=True)
class RoutingResult:
    available: bool
    authority_id: int | None
    reason: str

async def resolve_authority(*, state_code: str | None, district_code: str | None, category: str) -> RoutingResult:
    return RoutingResult(False, None, "No verified authority mapping was configured for this jurisdiction.")

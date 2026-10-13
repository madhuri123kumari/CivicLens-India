from pydantic import BaseModel
class AuthorityRead(BaseModel):
    id: int
    name: str
    authority_type: str
    state_code: str | None
    district_code: str | None
    active: bool
    model_config = {"from_attributes": True}

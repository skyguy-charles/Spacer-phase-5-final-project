from pydantic import BaseModel, EmailStr
from typing import Dict
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
from pydantic import BaseModel
from typing import Dict

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: Dict

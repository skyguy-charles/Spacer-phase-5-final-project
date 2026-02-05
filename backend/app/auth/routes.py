from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import SessionLocal
from app.auth.schemas import (
    RegisterRequest,
    LoginRequest,
    TokenResponse
)
from app.auth.service import (
    register_user,
    authenticate_user
)

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):
    return register_user(
        db=db,
        name=data.name,
        email=data.email,
        password=data.password
    )
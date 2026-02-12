from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.auth.schemas import RegisterRequest, LoginRequest, TokenResponse
from app.auth.service import register_user, authenticate_user

router = APIRouter()


@router.post("/register", response_model=TokenResponse)
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


@router.post("/login", response_model=TokenResponse)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):
    return authenticate_user(
        db=db,
        email=data.email,
        password=data.password
    )

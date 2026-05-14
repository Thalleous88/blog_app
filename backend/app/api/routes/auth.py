from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.post import PostRead
from app.schemas.token import Token
from app.schemas.user import UserCreate, UserLogin, UserRead
from app.services import auth_service, post_service

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def register(payload: UserCreate, db: Session = Depends(get_db)):
    return auth_service.register_user(db, payload)


@router.post("/login", response_model=Token)
async def login(payload: UserLogin, db: Session = Depends(get_db)):
    token = auth_service.login_user(db, payload)
    return Token(access_token=token)


@router.post("/logout")
async def logout():
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserRead)
async def me(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/me/posts", response_model=list[PostRead])
async def my_posts(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return post_service.list_my_posts(db, current_user)

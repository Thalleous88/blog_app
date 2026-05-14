from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, hash_password, verify_password
from app.repositories import user_repository
from app.schemas.user import UserCreate, UserLogin


def register_user(db: Session, payload: UserCreate):
    existing_user = user_repository.get_user_by_email(db, payload.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    return user_repository.create_user(db, payload.name, payload.email, hash_password(payload.password))


def login_user(db: Session, payload: UserLogin):
    user = user_repository.get_user_by_email(db, payload.email)
    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return create_access_token(str(user.id))

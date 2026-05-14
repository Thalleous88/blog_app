from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.post import PostCreate, PostList, PostRead, PostUpdate
from app.services import post_service

router = APIRouter(prefix="/posts", tags=["Posts"])


@router.get("", response_model=PostList)
async def get_posts(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=10, ge=1, le=50),
    search: str | None = Query(default=None, max_length=100),
    db: Session = Depends(get_db),
):
    return post_service.list_posts(db, page, limit, search)


@router.get("/{post_id}", response_model=PostRead)
async def get_post(post_id: int, db: Session = Depends(get_db)):
    return post_service.get_post(db, post_id)


@router.post("", response_model=PostRead, status_code=status.HTTP_201_CREATED)
async def create_post(
    payload: PostCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return post_service.create_post(db, payload, current_user)


@router.put("/{post_id}", response_model=PostRead)
async def update_post(
    post_id: int,
    payload: PostUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return post_service.update_post(db, post_id, payload, current_user)


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    post_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    post_service.delete_post(db, post_id, current_user)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

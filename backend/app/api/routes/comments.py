from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.comment import CommentCreate, CommentRead, CommentUpdate
from app.services import comment_service

router = APIRouter(tags=["Comments"])


@router.get("/posts/{post_id}/comments", response_model=list[CommentRead])
async def get_comments(post_id: int, db: Session = Depends(get_db)):
    return comment_service.list_comments(db, post_id)


@router.post("/posts/{post_id}/comments", response_model=CommentRead, status_code=status.HTTP_201_CREATED)
async def create_comment(
    post_id: int,
    payload: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return comment_service.create_comment(db, post_id, payload, current_user)


@router.put("/comments/{comment_id}", response_model=CommentRead)
async def update_comment(
    comment_id: int,
    payload: CommentUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return comment_service.update_comment(db, comment_id, payload, current_user)


@router.delete("/comments/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
    comment_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    comment_service.delete_comment(db, comment_id, current_user)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

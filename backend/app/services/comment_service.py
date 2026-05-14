from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories import comment_repository
from app.schemas.comment import CommentCreate, CommentUpdate
from app.services import post_service


def list_comments(db: Session, post_id: int):
    post_service.get_post(db, post_id)
    return comment_repository.list_comments_for_post(db, post_id)


def create_comment(db: Session, post_id: int, payload: CommentCreate, user: User):
    post_service.get_post(db, post_id)
    return comment_repository.create_comment(db, payload, post_id, user.id)


def update_comment(db: Session, comment_id: int, payload: CommentUpdate, user: User):
    comment = comment_repository.get_comment(db, comment_id)
    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
    if comment.author_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only edit your own comments")
    return comment_repository.update_comment(db, comment, payload)


def delete_comment(db: Session, comment_id: int, user: User) -> None:
    comment = comment_repository.get_comment(db, comment_id)
    if not comment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comment not found")
    if comment.author_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only delete your own comments")
    comment_repository.delete_comment(db, comment)

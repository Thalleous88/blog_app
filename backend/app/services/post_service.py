from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories import post_repository
from app.schemas.post import PostCreate, PostUpdate


def list_posts(db: Session, page: int, limit: int, search: str | None):
    return post_repository.list_posts(db, page, limit, search)


def list_my_posts(db: Session, user: User):
    return post_repository.list_posts_by_author(db, user.id)


def get_post(db: Session, post_id: int):
    post = post_repository.get_post(db, post_id)
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return post


def create_post(db: Session, payload: PostCreate, user: User):
    return post_repository.create_post(db, payload, user.id)


def update_post(db: Session, post_id: int, payload: PostUpdate, user: User):
    post = get_post(db, post_id)
    if post.author_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only edit your own posts")
    return post_repository.update_post(db, post, payload)


def delete_post(db: Session, post_id: int, user: User) -> None:
    post = get_post(db, post_id)
    if post.author_id != user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only delete your own posts")
    post_repository.delete_post(db, post)

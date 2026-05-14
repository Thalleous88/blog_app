from math import ceil

from sqlalchemy import or_
from sqlalchemy.orm import Session, joinedload

from app.models.post import Post
from app.schemas.post import PostCreate, PostUpdate


def get_post(db: Session, post_id: int) -> Post | None:
    return db.query(Post).options(joinedload(Post.author)).filter(Post.id == post_id).first()


def list_posts(db: Session, page: int, limit: int, search: str | None = None):
    query = db.query(Post).options(joinedload(Post.author))
    if search:
        term = f"%{search.strip()}%"
        query = query.filter(or_(Post.title.ilike(term), Post.content.ilike(term)))

    total = query.count()
    items = (
        query.order_by(Post.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )
    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit,
        "pages": ceil(total / limit) if total else 1,
    }


def list_posts_by_author(db: Session, author_id: int) -> list[Post]:
    return (
        db.query(Post)
        .options(joinedload(Post.author))
        .filter(Post.author_id == author_id)
        .order_by(Post.created_at.desc())
        .all()
    )


def create_post(db: Session, payload: PostCreate, author_id: int) -> Post:
    post = Post(**payload.model_dump(), author_id=author_id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return get_post(db, post.id)


def update_post(db: Session, post: Post, payload: PostUpdate) -> Post:
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(post, field, value)
    db.commit()
    db.refresh(post)
    return get_post(db, post.id)


def delete_post(db: Session, post: Post) -> None:
    db.delete(post)
    db.commit()

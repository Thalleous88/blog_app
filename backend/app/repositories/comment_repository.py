from sqlalchemy.orm import Session, joinedload

from app.models.comment import Comment
from app.schemas.comment import CommentCreate, CommentUpdate


def get_comment(db: Session, comment_id: int) -> Comment | None:
    return db.query(Comment).options(joinedload(Comment.author)).filter(Comment.id == comment_id).first()


def list_comments_for_post(db: Session, post_id: int) -> list[Comment]:
    return (
        db.query(Comment)
        .options(joinedload(Comment.author))
        .filter(Comment.post_id == post_id)
        .order_by(Comment.created_at.asc())
        .all()
    )


def create_comment(db: Session, payload: CommentCreate, post_id: int, author_id: int) -> Comment:
    comment = Comment(content=payload.content, post_id=post_id, author_id=author_id)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return get_comment(db, comment.id)


def update_comment(db: Session, comment: Comment, payload: CommentUpdate) -> Comment:
    comment.content = payload.content
    db.commit()
    db.refresh(comment)
    return get_comment(db, comment.id)


def delete_comment(db: Session, comment: Comment) -> None:
    db.delete(comment)
    db.commit()

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import UserSummary


class CommentCreate(BaseModel):
    content: str = Field(min_length=2, max_length=2000)


class CommentUpdate(BaseModel):
    content: str = Field(min_length=2, max_length=2000)


class CommentRead(BaseModel):
    id: int
    content: str
    post_id: int
    author_id: int
    created_at: datetime
    updated_at: datetime
    author: UserSummary

    model_config = ConfigDict(from_attributes=True)

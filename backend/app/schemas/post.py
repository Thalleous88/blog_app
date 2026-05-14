from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import UserSummary


class PostBase(BaseModel):
    title: str = Field(min_length=3, max_length=180)
    content: str = Field(min_length=20)
    category: str | None = Field(default=None, max_length=80)


class PostCreate(PostBase):
    pass


class PostUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=3, max_length=180)
    content: str | None = Field(default=None, min_length=20)
    category: str | None = Field(default=None, max_length=80)


class PostRead(PostBase):
    id: int
    author_id: int
    created_at: datetime
    updated_at: datetime
    author: UserSummary

    model_config = ConfigDict(from_attributes=True)


class PostList(BaseModel):
    items: list[PostRead]
    total: int
    page: int
    limit: int
    pages: int

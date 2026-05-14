from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class UserBase(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr


class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=128)

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        has_letter = any(char.isalpha() for char in value)
        has_digit = any(char.isdigit() for char in value)
        if not has_letter or not has_digit:
            raise ValueError("Password must contain at least one letter and one number")
        return value


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1)


class UserRead(UserBase):
    id: int
    profile_image: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserSummary(BaseModel):
    id: int
    name: str
    email: EmailStr
    profile_image: str | None = None

    model_config = ConfigDict(from_attributes=True)

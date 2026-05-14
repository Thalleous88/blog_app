from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import auth, comments, posts
from app.core.config import get_settings
from app.middleware.errors import register_exception_handlers

settings = get_settings()

app = FastAPI(title="Talent Growth Blog API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)

app.include_router(auth.router)
app.include_router(posts.router)
app.include_router(comments.router)


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}

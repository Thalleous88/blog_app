# Talent Growth Blog Platform

A production-ready full-stack blog platform built with React, Vite, Tailwind CSS, Axios, React Router DOM, FastAPI, SQLAlchemy, PostgreSQL, Pydantic, Alembic, JWT authentication, and bcrypt password hashing.

## Project Structure

```text
backend/
  app/
    api/
    core/
    models/
    repositories/
    schemas/
    services/
    middleware/
    utils/
  alembic/
  requirements.txt
  .env
  .env.example
  alembic.ini
frontend/
  src/
    api/
    assets/
    components/
    context/
    hooks/
    layouts/
    pages/
    routes/
    services/
    types/
    utils/
docs/
  API.md
```

## Backend Setup

1. Create a PostgreSQL database locally or in Neon.

```bash
createdb blog_app
```

2. Create and activate a Python virtual environment.

```bash
cd backend
python -m venv .venv
```

Windows PowerShell:

```bash
.\.venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source .venv/bin/activate
```

3. Install dependencies.

```bash
pip install -r requirements.txt
```

4. Configure environment variables.

```bash
cp .env.example .env
```

Update `DATABASE_URL`, `SECRET_KEY`, and `BACKEND_CORS_ORIGINS`.

5. Run migrations.

```bash
alembic upgrade head
```

6. Start the API server.

```bash
uvicorn app.main:app --reload
```

The backend runs at `http://localhost:8000`. FastAPI docs are available at `http://localhost:8000/docs`.

## Frontend Setup

1. Install dependencies.

```bash
cd frontend
npm install
```

2. Configure environment variables.

```bash
cp .env.example .env
```

Set:

```text
VITE_API_URL=http://localhost:8000
```

3. Run Vite.

```bash
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Core Features

- Registration and login with JWT Bearer authentication
- bcrypt password hashing through `passlib[bcrypt]`
- Protected frontend routes and authenticated backend dependencies
- User profile page with the user's own posts
- Create, edit, delete, list, and view blog posts
- Author-only post editing and deletion
- Create, edit, delete, and view comments
- Author-only comment editing and deletion
- Search posts by title or content
- Paginated homepage
- Markdown authoring and rendering
- Pydantic and Zod validation
- Structured error responses and frontend toast feedback
- Responsive editorial UI

## API Documentation

See [docs/API.md](docs/API.md).


## Commit Message Format

Use descriptive commit messages with this scope:

```text
feat(talent-growth): Setup FastAPI authentication
feat(talent-growth): Add post CRUD endpoints
feat(talent-growth): Implement markdown rendering
feat(talent-growth): Add pagination and search
```

## Production Notes

- Replace the sample `SECRET_KEY` before deployment.
- Keep `.env` files out of version control.
- Use HTTPS URLs in production CORS settings.
- Run `alembic upgrade head` before starting the first production release.
- Rotate secrets if they are ever exposed.

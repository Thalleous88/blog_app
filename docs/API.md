# API Documentation

Base URL in local development:

```text
http://localhost:8000
```

Authentication uses JWT Bearer tokens.

```text
Authorization: Bearer <access_token>
```

## Health

### GET `/health`

Returns API health.

Response:

```json
{
  "status": "ok"
}
```

## Auth

### POST `/auth/register`

Creates a user.

Request:

```json
{
  "name": "Sebastian Reed",
  "email": "sebastian@example.com",
  "password": "Growth123"
}
```

Responses:

- `201 Created`: user profile
- `409 Conflict`: user already exists
- `422 Unprocessable Entity`: validation error

### POST `/auth/login`

Authenticates a user and returns a JWT.

Request:

```json
{
  "email": "sebastian@example.com",
  "password": "Growth123"
}
```

Response:

```json
{
  "access_token": "jwt-token",
  "token_type": "bearer"
}
```

Errors:

- `401 Unauthorized`: invalid credentials

### POST `/auth/logout`

Returns a logout acknowledgement. The frontend removes the stored token.

### GET `/auth/me`

Protected. Returns the authenticated user's profile.

### GET `/auth/me/posts`

Protected. Returns posts written by the authenticated user.

## Posts

### GET `/posts`

Lists posts with search and pagination.

Query parameters:

- `page`: default `1`
- `limit`: default `10`, max `50`
- `search`: optional title/content search

Example:

```text
/posts?page=1&limit=10&search=architecture
```

Response:

```json
{
  "items": [],
  "total": 0,
  "page": 1,
  "limit": 10,
  "pages": 1
}
```

### GET `/posts/{id}`

Returns a single post.

Errors:

- `404 Not Found`: post not found

### POST `/posts`

Protected. Creates a post.

Request:

```json
{
  "title": "Designing Better Engineering Rituals",
  "content": "A long markdown-enabled post body...",
  "category": "Engineering"
}
```

Responses:

- `201 Created`: created post
- `401 Unauthorized`: missing or invalid token
- `422 Unprocessable Entity`: validation error

### PUT `/posts/{id}`

Protected. Author only. Updates a post.

Request:

```json
{
  "title": "Designing Better Engineering Rituals",
  "content": "Updated markdown body...",
  "category": "Engineering"
}
```

Errors:

- `401 Unauthorized`: missing or invalid token
- `403 Forbidden`: user is not the author
- `404 Not Found`: post not found

### DELETE `/posts/{id}`

Protected. Author only. Deletes a post.

Responses:

- `204 No Content`: deleted
- `403 Forbidden`: user is not the author
- `404 Not Found`: post not found

## Comments

### GET `/posts/{id}/comments`

Returns comments under a post.

Errors:

- `404 Not Found`: post not found

### POST `/posts/{id}/comments`

Protected. Creates a comment under a post.

Request:

```json
{
  "content": "This gave me a sharper way to think about planning cycles."
}
```

Responses:

- `201 Created`: created comment
- `401 Unauthorized`: missing or invalid token
- `404 Not Found`: post not found
- `422 Unprocessable Entity`: validation error

### PUT `/comments/{id}`

Protected. Author only. Updates a comment.

Request:

```json
{
  "content": "Updated comment content."
}
```

Errors:

- `403 Forbidden`: user is not the comment author
- `404 Not Found`: comment not found

### DELETE `/comments/{id}`

Protected. Author only. Deletes a comment.

Responses:

- `204 No Content`: deleted
- `403 Forbidden`: user is not the comment author
- `404 Not Found`: comment not found

## Validation Rules

- User name: 2 to 120 characters
- Email: valid email format
- Password: at least 8 characters, at least one letter, at least one number
- Post title: 3 to 180 characters
- Post content: at least 20 characters
- Category: optional, max 80 characters
- Comment content: 2 to 2000 characters

# Invite Requests API - Quick Reference

## Authentication

The GET endpoint requires API key authentication. Set the `API_KEY` environment variable:

```bash
# Generate a secure API key
openssl rand -hex 32

# Add to .env file
echo "API_KEY=your-generated-key-here" >> .env
```

**Header Options:**
- `x-api-key: YOUR_API_KEY` (recommended)
- `Authorization: Bearer YOUR_API_KEY` (alternative)

## Endpoints

### GET `/api/invite-requests`

Retrieve invite requests with pagination and filtering.

**Authentication:** Required - API key in header

**Headers:**
- `x-api-key: YOUR_API_KEY` (recommended)
- `Authorization: Bearer YOUR_API_KEY` (alternative)

**Query Parameters:**
- `limit` (number, default: 100) - Max results per page
- `offset` (number, default: 0) - Skip N results
- `role` (string) - Filter by role: `creator`, `developer`, or `investor`

**Examples:**

```bash
export API_KEY=your-api-key
# Get first 100 requests
curl -H "x-api-key: $API_KEY" \
  http://localhost:3000/api/invite-requests

# Get next page (with pagination)
curl -H "x-api-key: $API_KEY" \
  "http://localhost:3000/api/invite-requests?limit=20&offset=20"

# Filter by developer role
curl -H "x-api-key: $API_KEY" \
  "http://localhost:3000/api/invite-requests?role=developer"

# Get 10 creators, skip first 5
curl -H "x-api-key: $API_KEY" \
  "http://localhost:3000/api/invite-requests?role=creator&limit=10&offset=5"

# Using Bearer token instead
curl -H "Authorization: Bearer $API_KEY" \
  http://localhost:3000/api/invite-requests
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "developer",
      "description": "...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 100,
    "offset": 0,
    "hasMore": true
  }
}
```

### POST `/api/invite-requests`

Submit a new invite request.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "developer",
  "description": "I want to contribute"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/invite-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "creator",
    "description": "Excited to share my ideas"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Invite request submitted successfully",
  "data": {
    "id": "...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "creator",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Testing

Run all tests:
```bash
pnpm test:unit
```

Run automated API tests:
```bash
./test-api.sh
```

## Common Use Cases

### Paginated List
```bash
# First page
curl "http://localhost:3000/api/invite-requests?limit=25&offset=0"

# Second page
curl "http://localhost:3000/api/invite-requests?limit=25&offset=25"

# Third page
curl "http://localhost:3000/api/invite-requests?limit=25&offset=50"
```

### Role-Based Filtering
```bash
# Get all developers
curl "http://localhost:3000/api/invite-requests?role=developer"

# Get all creators
curl "http://localhost:3000/api/invite-requests?role=creator"

# Get all investors
curl "http://localhost:3000/api/invite-requests?role=investor"
```

### Check if More Results Exist
The `pagination.hasMore` field indicates if there are more results beyond the current page.

```javascript
const response = await fetch('/api/invite-requests?limit=20&offset=0')
const data = await response.json()

if (data.pagination.hasMore) {
  // Fetch next page
  const nextPage = await fetch(`/api/invite-requests?limit=20&offset=20`)
}
```

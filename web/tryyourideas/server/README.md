# Server API Documentation

## Invite Requests API

### Overview

The invite requests API allows users to submit requests to join the platform. All submissions are stored in a local MongoDB database.

### Setup

1. **Start MongoDB**

   **Option A: Using Docker (Recommended)**
   ```bash
   # Start MongoDB using docker-compose
   docker-compose up -d

   # Check status
   docker-compose ps

   # Stop MongoDB
   docker-compose down
   ```

   **Option B: Install MongoDB Locally**
   ```bash
   # On Ubuntu/Debian
   sudo apt-get install mongodb
   sudo systemctl start mongodb

   # On macOS with Homebrew
   brew install mongodb-community
   brew services start mongodb-community

   # On Windows
   # Download and install from https://www.mongodb.com/try/download/community
   ```

2. **Configure Environment**

   Create a `.env` file in the project root:
   ```env
   MONGODB_URI=mongodb://localhost:27017/tryyourideas
   API_KEY=your-secure-api-key-here
   ```

   Generate a secure API key:
   ```bash
   # Using openssl
   openssl rand -hex 32

   # Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Start the Development Server**
   ```bash
   pnpm dev
   ```

### API Endpoints

#### **POST** `/api/invite-requests`

Submits a new invite request and stores it in the MongoDB database.

#### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "developer",
  "description": "I'm interested in contributing to the project"
}
```

#### Field Validation

- **name** (required): User's full name
- **email** (required): Valid email address format
- **role** (required): Must be one of: `creator`, `developer`, `investor`
- **description** (required): Description of interest/background

#### Success Response

**Status Code:** 200

```json
{
  "success": true,
  "message": "Invite request submitted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "developer",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Error Responses

**Status Code:** 400 - Bad Request

```json
{
  "statusCode": 400,
  "statusMessage": "Missing required fields"
}
```

```json
{
  "statusCode": 400,
  "statusMessage": "Invalid email format"
}
```

```json
{
  "statusCode": 400,
  "statusMessage": "Invalid role"
}
```

**Status Code:** 500 - Server Error

```json
{
  "statusCode": 500,
  "statusMessage": "Failed to save invite request"
}
```

#### **GET** `/api/invite-requests`

Retrieves a list of invite requests from the database with pagination and filtering support.

**Authentication:** Requires API key in `x-api-key` header or `Authorization: Bearer` header.

##### Headers

- **x-api-key** (required): Your API key
- **Authorization** (alternative): `Bearer YOUR_API_KEY`

##### Query Parameters

- **limit** (optional, default: 100): Maximum number of results to return
- **offset** (optional, default: 0): Number of results to skip (for pagination)
- **role** (optional): Filter by role (`creator`, `developer`, or `investor`)

##### Example Requests

```bash
# Get all invite requests (using x-api-key header)
curl -H "x-api-key: your-api-key-here" \
  http://localhost:3000/api/invite-requests

# Get with custom pagination (using Bearer token)
curl -H "Authorization: Bearer your-api-key-here" \
  "http://localhost:3000/api/invite-requests?limit=20&offset=0"

# Filter by role
curl -H "x-api-key: your-api-key-here" \
  "http://localhost:3000/api/invite-requests?role=developer"

# Combine filtering and pagination
curl -H "x-api-key: your-api-key-here" \
  "http://localhost:3000/api/invite-requests?role=creator&limit=10&offset=20"
```

##### Success Response

**Status Code:** 200

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "developer",
      "description": "I want to contribute",
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

##### Error Responses

**Status Code:** 401 - Unauthorized

```json
{
  "statusCode": 401,
  "statusMessage": "Unauthorized - Invalid or missing API key"
}
```

**Status Code:** 500 - Server Error

```json
{
  "statusCode": 500,
  "statusMessage": "Failed to fetch invite requests"
}
```

### Database Schema

The invite requests are stored with the following schema:

```typescript
{
  name: string,        // User's name (trimmed)
  email: string,       // Email (lowercase, trimmed)
  role: string,        // One of: creator, developer, investor
  description: string, // User's description (trimmed)
  createdAt: Date,     // Automatically set
  updatedAt: Date      // Automatically updated
}
```

### Testing

```bash
# Run unit tests
pnpm test:unit

# Run automated API tests (set API_KEY environment variable for GET tests)
export API_KEY=your-api-key-here
./test-api.sh

# Test POST endpoint manually (no authentication required)
curl -X POST http://localhost:3000/api/invite-requests \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "role": "developer",
    "description": "Testing the API"
  }'

# Test GET endpoint manually (requires API key)
curl -H "x-api-key: your-api-key-here" \
  http://localhost:3000/api/invite-requests

# Test GET endpoint with filters
curl -H "x-api-key: your-api-key-here" \
  "http://localhost:3000/api/invite-requests?role=developer&limit=10"

# Test with Bearer token
curl -H "Authorization: Bearer your-api-key-here" \
  http://localhost:3000/api/invite-requests
```

### MongoDB Management

View stored invite requests using MongoDB shell:

```bash
# Connect to MongoDB
mongosh

# Switch to database
use tryyourideas

# View all invite requests
db.inviterequests.find().pretty()

# Count total requests
db.inviterequests.countDocuments()

# Find by role
db.inviterequests.find({ role: "developer" }).pretty()
```

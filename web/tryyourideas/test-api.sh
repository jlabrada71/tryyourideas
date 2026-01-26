#!/bin/bash

# Test script for invite-requests API endpoint
# Usage: ./test-api.sh
# Set API_KEY environment variable for GET endpoint tests

API_URL="${API_URL:-http://localhost:3000/api/invite-requests}"
API_KEY="${API_KEY:-}"

echo "Testing Invite Requests API at: $API_URL"
if [ -n "$API_KEY" ]; then
  echo "Using API Key: ${API_KEY:0:10}..."
else
  echo "Warning: No API_KEY set. GET tests will fail."
fi
echo "========================================="
echo ""

# Test 1: Valid request
echo "Test 1: Valid invite request"
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "developer",
    "description": "I want to contribute to this project"
  }')

echo "Response: $response"
echo ""

# Test 2: Missing required field
echo "Test 2: Missing required field (should fail)"
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "creator"
  }')

echo "Response: $response"
echo ""

# Test 3: Invalid email
echo "Test 3: Invalid email format (should fail)"
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "role": "investor",
    "description": "Test description"
  }')

echo "Response: $response"
echo ""

# Test 4: Invalid role
echo "Test 4: Invalid role (should fail)"
response=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "role": "admin",
    "description": "Test description"
  }')

echo "Response: $response"
echo ""

echo "========================================="
echo "GET Endpoint Tests"
echo "========================================="
echo ""

# Test 5: Get without API key (should fail)
echo "Test 5: Get without API key (should fail with 401)"
response=$(curl -s "$API_URL")
echo "Response: $response"
echo ""

if [ -z "$API_KEY" ]; then
  echo "Skipping authenticated GET tests (no API_KEY set)"
  echo ""
else
  # Test 6: Get all invite requests with API key
  echo "Test 6: Get all invite requests (with API key)"
  response=$(curl -s -H "x-api-key: $API_KEY" "$API_URL")
  echo "Response: $response"
  echo ""

  # Test 7: Get with pagination
  echo "Test 7: Get with pagination (limit=2)"
  response=$(curl -s -H "x-api-key: $API_KEY" "$API_URL?limit=2&offset=0")
  echo "Response: $response"
  echo ""

  # Test 8: Filter by role
  echo "Test 8: Filter by role (developer)"
  response=$(curl -s -H "x-api-key: $API_KEY" "$API_URL?role=developer")
  echo "Response: $response"
  echo ""

  # Test 9: Combined filters
  echo "Test 9: Combined filters (role=creator, limit=5)"
  response=$(curl -s -H "x-api-key: $API_KEY" "$API_URL?role=creator&limit=5&offset=0")
  echo "Response: $response"
  echo ""

  # Test 10: Using Bearer token
  echo "Test 10: Using Authorization Bearer header"
  response=$(curl -s -H "Authorization: Bearer $API_KEY" "$API_URL?limit=1")
  echo "Response: $response"
  echo ""
fi

echo "========================================="
echo "Testing complete!"

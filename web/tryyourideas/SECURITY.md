# Security Configuration

## API Key Authentication

The invite requests GET endpoint is protected with API key authentication to prevent unauthorized access to user data.

### Setup

1. **Generate a secure API key:**

   ```bash
   # Using openssl (recommended)
   openssl rand -hex 32

   # Using Node.js
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Add to environment:**

   Create or update `.env` file:
   ```env
   API_KEY=your-generated-secure-key-here
   ```

3. **Restart the server:**

   ```bash
   pnpm dev
   ```

### Using the API Key

#### Option 1: x-api-key Header (Recommended)

```bash
curl -H "x-api-key: your-api-key-here" \
  http://localhost:3000/api/invite-requests
```

#### Option 2: Authorization Bearer Header

```bash
curl -H "Authorization: Bearer your-api-key-here" \
  http://localhost:3000/api/invite-requests
```

### Protected vs Public Endpoints

| Endpoint | Method | Authentication Required |
|----------|--------|------------------------|
| `/api/invite-requests` | GET | Yes - API Key |
| `/api/invite-requests` | POST | No |

**Rationale:**
- **GET endpoint**: Protected to prevent unauthorized access to submitted invite requests
- **POST endpoint**: Public to allow users to submit invite requests without barriers

### Security Best Practices

1. **Keep your API key secret**
   - Never commit API keys to version control
   - Use environment variables
   - Rotate keys periodically

2. **Use HTTPS in production**
   - API keys sent over HTTP can be intercepted
   - Always use HTTPS in production environments

3. **Implement rate limiting** (recommended)
   - Prevent abuse of the public POST endpoint
   - Consider using packages like `express-rate-limit` or Nuxt middleware

4. **Key rotation**
   ```bash
   # Generate new key
   NEW_KEY=$(openssl rand -hex 32)

   # Update .env
   sed -i "s/API_KEY=.*/API_KEY=$NEW_KEY/" .env

   # Restart server
   pnpm dev
   ```

5. **Monitor API usage**
   - Log authentication failures
   - Track API key usage patterns
   - Set up alerts for suspicious activity

### Error Handling

When authentication fails, the API returns:

```json
{
  "statusCode": 401,
  "statusMessage": "Unauthorized - Invalid or missing API key"
}
```

### Testing with Authentication

```bash
# Set API key for testing
export API_KEY=your-api-key-here

# Run automated tests
./test-api.sh

# Manual test
curl -H "x-api-key: $API_KEY" \
  http://localhost:3000/api/invite-requests
```

### Production Deployment

In production, ensure:
1. API key is set via environment variable (not hardcoded)
2. Use a different API key than development
3. Store API key securely (e.g., AWS Secrets Manager, Azure Key Vault)
4. Enable HTTPS
5. Implement additional security measures (CORS, rate limiting, etc.)

### Troubleshooting

**401 Unauthorized Error:**
- Verify API_KEY is set in .env
- Check header spelling: `x-api-key` (lowercase with hyphens)
- Ensure no extra spaces in the API key value
- Restart server after updating .env

**API_KEY not found warning:**
```
API_KEY environment variable not set. API key validation will fail.
```
- Solution: Add API_KEY to your .env file and restart the server

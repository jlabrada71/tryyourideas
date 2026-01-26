import { getHeader, createError } from 'h3'
import type { H3Event } from 'h3'

/**
 * Validates API key from request headers
 * @param event - H3 event object
 * @returns true if valid, false otherwise
 */
export function validateApiKey(event: H3Event): boolean {
  const apiKey = getHeader(event, 'x-api-key') || getHeader(event, 'authorization')?.replace('Bearer ', '')
  const validApiKey = process.env.API_KEY

  if (!validApiKey) {
    console.warn('API_KEY environment variable not set. API key validation will fail.')
    return false
  }

  return apiKey === validApiKey
}

/**
 * Middleware to require API key authentication
 * Throws 401 error if API key is missing or invalid
 */
export function requireApiKey(event: H3Event): void {
  if (!validateApiKey(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Invalid or missing API key'
    })
  }
}

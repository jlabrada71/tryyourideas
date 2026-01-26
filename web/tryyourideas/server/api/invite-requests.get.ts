import { connectToDatabase } from '../utils/db'
import { InviteRequest } from '../models/InviteRequest'
import { requireApiKey } from '../utils/auth'

export default defineEventHandler(async (event) => {
  // Require API key authentication
  requireApiKey(event)

  try {
    // Connect to database
    await connectToDatabase()

    // Get query parameters for filtering and pagination
    const query = getQuery(event)
    const limit = Number(query.limit) || 100
    const offset = Number(query.offset) || 0
    const role = query.role as string | undefined

    // Build filter
    const filter: Record<string, unknown> = {}
    if (role && ['creator', 'developer', 'investor'].includes(role)) {
      filter.role = role
    }

    // Query invite requests
    const inviteRequests = await InviteRequest
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .select('-__v')
      .lean()

    // Get total count for pagination
    const total = await InviteRequest.countDocuments(filter)

    return {
      success: true,
      data: inviteRequests,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    }
  } catch (error) {
    console.error('Error fetching invite requests:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch invite requests'
    })
  }
})

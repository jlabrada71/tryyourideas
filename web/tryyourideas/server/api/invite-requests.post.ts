import { connectToDatabase } from '../utils/db'
import { InviteRequest } from '../models/InviteRequest'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  const { name, email, role, description } = body

  if (!name || !email || !role || !description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format'
    })
  }

  // Validate role
  const validRoles = ['creator', 'developer', 'investor']
  if (!validRoles.includes(role)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid role'
    })
  }

  try {
    // Connect to database
    await connectToDatabase()

    // Create and save invite request
    const inviteRequest = new InviteRequest({
      name,
      email,
      role,
      description
    })

    await inviteRequest.save()

    return {
      success: true,
      message: 'Invite request submitted successfully',
      data: {
        id: inviteRequest._id,
        name: inviteRequest.name,
        email: inviteRequest.email,
        role: inviteRequest.role,
        createdAt: inviteRequest.createdAt
      }
    }
  } catch (error) {
    console.error('Error saving invite request:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save invite request'
    })
  }
})

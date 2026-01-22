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

  // TODO: Store invite request in database
  // For now, log the request
  console.log('New invite request:', {
    name,
    email,
    role,
    description,
    createdAt: new Date().toISOString()
  })

  return {
    success: true,
    message: 'Invite request submitted successfully'
  }
})

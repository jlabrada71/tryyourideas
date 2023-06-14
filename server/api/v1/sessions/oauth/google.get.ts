import { log, debug } from '@/lib/logger.js'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  log('oauth google GET')
  const query = getQuery(event)

  if (!query.userId) {
    return {
      error: 'userId is required'
    }
  }

  return {txt: 'google oauth ok'}
})

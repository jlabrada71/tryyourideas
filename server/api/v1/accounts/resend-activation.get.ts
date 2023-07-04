// curl -H "Content-Type: application/json"  'localhost:3000/api/v1/accounts'
// https://www.jsdocs.io/package/h3#getQuery
import { log, debug } from '@/lib/logger.js'
import { getAccountService } from '@/lib/accounts/Service.js'

const config = useRuntimeConfig() 

export default defineEventHandler(async (event) => {
  log('resend GET')
  const accountService = getAccountService(config)
  await accountService.resendActivationMessages()
 
  return { result: 'ok' }
})
// curl -H "Content-Type: application/json" -d '{"name": "jlabrada", "email":"jlabrada@yahoo.com"}' -X POST 'localhost:3000/api/v1/accounts'
import { debug } from '@/lib/logger.js'
import { AccountService } from '@/lib/accounts/service.js'

const config = useRuntimeConfig() 

export default defineEventHandler(async (event) => {
  debug('account POST')
  const body = await readBody(event)
  const accountService = new AccountService(config)
  const result = await accountService.add( body )
  return result
})

// curl -H "Content-Type: application/json"  'localhost:3000/api/v1/accounts'
// https://www.jsdocs.io/package/h3#getQuery
import { log, debug } from '@/lib/logger.js'
import { AccountRepository } from '@/lib/accounts/Repository.js'

const config = useRuntimeConfig() 
const repository = new AccountRepository(config)

export default defineEventHandler(async (event) => {
  log('account GET')
  const query = await getQuery(event)
  log(query)
  if (query.email) {
    return await repository.select(acc => acc.email === query.email )
  }
  return await repository.select()
})
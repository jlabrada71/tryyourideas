// curl -H "Content-Type: application/json"  'localhost:3000/api/v1/accounts'
// https://www.jsdocs.io/package/h3#getQuery
import { log, debug } from '@/lib/logger'
import { AccountRepository } from '@/lib/AccountRepository'

const config = useRuntimeConfig() 
const repository = new AccountRepository(`${config.data}/accounts/accounts.json`, { createIfNotExists: true })

export default defineEventHandler(async (event) => {
  log('account GET')
  const query = await getQuery(event)
  if (query.email) {
    return await repository.select(acc => acc.email === query.email )
  }
  return await repository.select()
})
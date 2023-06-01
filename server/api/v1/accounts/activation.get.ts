// curl -H "Content-Type: application/json"  'localhost:3000/api/v1/accounts'
// https://www.jsdocs.io/package/h3#getQuery
import { log, debug } from '@/lib/logger'
import { AccountRepository } from '@/lib/AccountRepository'

const config = useRuntimeConfig() 
const repository = new AccountRepository(config)

export default defineEventHandler(async (event) => {
  log('account GET')
  const query = await getQuery(event)
  if (!query.email) {
    return {
      status: 'error',
      msg: 'Missing email parameter'
    }
  }

  if (!query.code) {
    return {
      status: 'error',
      msg: 'Missing code parameter'
    }
  }

  const result = await repository.select(acc => acc.email === query.email )
  if (result.length === 0) {
    return {
      status: 'error',
      msg: 'Account not found'
    }
  }

  if (result.length > 1) {
    return {
      status: 'error',
      msg: 'Account duplicated'
    }
  }

  const account = result[0]
  debug(account)

  if (account.active) {
    return {
      name: account.name,
      status: 'error',
      msg: 'Account already activated'
    }
  }

  if (account.activationCode !== query.code) {
    return {
      name: account.name,
      status: 'error',
      msg: 'Invalid activation code'
    }
  }

  account.active = true
  await repository.update(account)

  return {
    name: account.name,
    status: 'ok',
    msg: 'Account activated successfully'
  }
})
// curl -H "Content-Type: application/json"  'localhost:3000/api/v1/accounts'
// https://www.jsdocs.io/package/h3#getQuery
import { log, debug } from '@/lib/logger.js'
import { getAccountService } from '@/lib/accounts/Service.js'

const config = useRuntimeConfig() 
const service = getAccountService(config)

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

  const account = await service.getAccountByEamail( query.email )

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
  await service.update(account)

  return {
    name: account.name,
    status: 'ok',
    msg: 'Account activated successfully'
  }
})
// curl -H "Content-Type: application/json"  'localhost:3000/api/v1/accounts'
// https://www.jsdocs.io/package/h3#getQuery
import { log, debug } from '@/lib/logger.js'
import { getAccountService } from '@/lib/accounts/Service.js'
import { decodeJwt } from '@/lib/authorization/jwt-utils.js'

const config = useRuntimeConfig() 

export default defineEventHandler(async (event) => {
  log('bytoken GET')
  try {
    const query = await getQuery(event)

    const accessToken = getCookie(event, 'access_token')
    const refreshToken = getCookie(event, 'refresh_token')
    log('ACCESS TOKEN')
    log(accessToken)
    const decoded = decodeJwt(accessToken, { key: config.accessTokenPrivateKey, passphrase: config.keyPassword } )
    
    log( decoded )
    const { sub, iat, exp } = decoded
    debug({sub, iat, exp })

    debug('REFRESH TOKEN')
    debug(refreshToken)

    const accountService = getAccountService(config)
    const account = await accountService.getAccountById( sub )

    return {
      data: account,
      status: 'ok'
    }
  } catch(e) {
    return {
      status: 'error',
      msg: e.message
    }
  }
})
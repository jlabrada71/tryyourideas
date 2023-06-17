// curl -H "Content-Type: application/json" -d '{"name": "jlabrada", "email":"jlabrada@yahoo.com"}' -X POST 'localhost:3000/api/v1/accounts'
import { log, debug } from '@/lib/logger.js'
import { getAuthorizationService } from '@/lib/authorization/Service.js'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  log('account signin POST')
  const body = await readBody(event)

  try {
    const authorizationService = getAuthorizationService(config)
    const { accessToken, refreshToken, accessTokenCookieOptions, refreshTokenCookieOptions} 
          = await authorizationService.signIn( { email: body.email, password: body.password })
    setCookie(event, 'access_token', accessToken, accessTokenCookieOptions);
    setCookie(event, 'refresh_token', refreshToken, refreshTokenCookieOptions);

    return {
      result: 'ok',
      action: 'redirect',
      errorCode: '',
      accessToken: accessToken,
      path: `\editor`
    }
  } catch (err: any) {
    return {
      result: 'error',
      action: 'redirect',
      message: err.message,
      errorCode: '05',
      path: `/oauth/error`

    }
  }
})

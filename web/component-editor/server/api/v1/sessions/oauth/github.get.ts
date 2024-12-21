import { log, debug } from '@/lib/logger.js'
import { getAuthorizationService } from '@/lib/authorization/Service.js'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  log('oauth google GET')
  const query = getQuery(event)

  const code = query.code
  const pathUrl = query.path

  if (query.error) {
    return { 
      result: 'error',
      errorCode: '01',
      action: 'redirect',
      path: '/'
    }
  }

  if (!code) {
    return { 
      result: 'error',
      statusCode: 401,
      errorCode: '02',
      msg: 'Authorization code not provided!'
    }
  }
  try {
    const authorizationService = getAuthorizationService(config)
    const { accessToken, refreshToken, accessTokenCookieOptions, refreshTokenCookieOptions} = await authorizationService.signinWithGithubCode(code)
    setCookie(event, 'access_token', accessToken, accessTokenCookieOptions);
    setCookie(event, 'refresh_token', refreshToken, refreshTokenCookieOptions);

    return {
      result: 'ok',
      action: 'redirect',
      errorCode: '',
      accessToken: accessToken,
      refreshToken:  refreshToken,
      path: `${pathUrl}`
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


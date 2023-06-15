import { DateProvider } from '@/lib/date-utils.js'
import { log, debug } from '@/lib/logger.js'
import { signJwt } from "@/lib/authorization/jwt-utils.js"

export function getSessionService(config) {
  const dateProvider = new DateProvider()
  return new SessionService(config, dateProvider)
}
export class SessionService {
  constructor(config, dateProvider) {
    this.config = config
    this.dateProvider = dateProvider
  }

  async signTokens(user){
    try {
      const access_token = signJwt({ sub: user.id },
        { key: this.config.accessTokenPrivateKey, passphrase:  this.config.keyPassword }, {
        expiresIn: `${this.config.accessTokenExpiresIn}m`,
      })
  
      const refresh_token = signJwt({ sub: user.id }, { key: this.config.refreshTokenPrivateKey, passphrase:  this.config.keyPassword }, {
        expiresIn: `${this.config.refreshTokenExpiresIn}m`,
      })
  
      return { access_token, refresh_token }
    } catch(e) {
      log(e)
      throw new Error(e)
    }
  }

  async getAccessTokens(user) {

    const accessTokenCookieOptions = {
      expires: this.dateProvider.minutesFromNow(this.config.accessTokenExpiresIn),
    }
  
    const refreshTokenCookieOptions = {
      expires: this.dateProvider.minutesFromNow( this.config.refreshTokenExpiresIn),
    }
  
    const { access_token: accessToken, refresh_token: refreshToken } = await this.signTokens(user)
  
    return { accessToken, refreshToken, accessTokenCookieOptions, refreshTokenCookieOptions }
  }
}
import axios, { formToJSON } from "axios"
import qs from "qs"
import { signJwt } from "@/lib/authorization/jwt-utils.js"
import { DateProvider } from '@/lib/date-utils.js'
import { getAccountService } from '@/lib/accounts/service.js'
import { debug } from '@/lib/logger.js'

class AuthorizationError extends Error {
  constructor(message, data, err) {
    super(message, err)
    this.data = data
  }
}

export const getGoogleOauthToken = async ({ code }, config) => {
  const rootURl = "https://oauth2.googleapis.com/token";

  const options = {
    code,
    client_id: config.public.googleOAuthClientId,
    client_secret: config.googleOAuthClientSecret,
    redirect_uri: config.googleOAuthRedirect,
    grant_type: "authorization_code",
  }
  try {
    const { data } = await axios.post(
      rootURl,
      qs.stringify(options),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return data;
  } catch (err) {
    console.log("Failed to fetch Google Oauth Tokens");
    throw new Error(err);
  }
}


export async function getGoogleUser({ id_token, access_token }) {
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );

    return data
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
}

// 👇 GitHub OAuth

// type GitHubOauthToken = {
//   access_token: string;
// };

// interface GitHubUser {
//   login: string;
//   id: number;
//   node_id: string;
//   avatar_url: string;
//   gravatar_id: string;
//   url: string;
//   html_url: string;
//   followers_url: string;
//   following_url: string;
//   gists_url: string;
//   starred_url: string;
//   subscriptions_url: string;
//   organizations_url: string;
//   repos_url: string;
//   events_url: string;
//   received_events_url: string;
//   type: string;
//   site_admin: boolean;
//   name: string;
//   company: string;
//   blog: string;
//   location: null;
//   email: string;
//   hireable: boolean;
//   bio: string;
//   twitter_username: string;
//   public_repos: number;
//   public_gists: number;
//   followers: number;
//   following: number;
//   created_at: Date;
//   updated_at: Date;
// }

export const getGithubOathToken = async ({ code }, config) => {
  const rootUrl = "https://github.com/login/oauth/access_token";
  const options = {
    client_id: config.public.githubOAuthClientId,
    client_secret: config.githubOAuthClientSecret,
    code,
  };

  try {
    const { data } = await axios.post(`${rootUrl}`, options,
    {
      headers: {
        "Content-Type": "application/json",
      },
    })

    const decoded = qs.parse(data)
    if (decoded.error) {
      throw Error(`${decoded.error}: ${decoded.error_description}`)
    }

    return decoded;
  } catch (err) {
    throw Error('Error getting github OathToken:' + err.message, err);
  }
};

export const getGithubUser = async ({ access_token }) => {
  try {
    const { data } = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    return data;
  } catch (err) {
    throw Error('Error getting github user:' + err.message, err)
  }
}

export function getAuthorizationService(config) {
  const dateProvider = new DateProvider()
  const accountService = getAccountService(config)
  return new AuthorizationService( config, accountService, dateProvider)
}
export class AuthorizationService {
  constructor(config, accountService, dateProvider) {
    this.config = config
    this.accountService = accountService
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
      console.log(e)
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

  async signinWithGithubCode(code) {

    try {
      // Get the user the access_token with the code
      const { access_token } = await getGithubOathToken({ code }, this.config);
  
      // Get the user with the access_token
      const { id, email, avatar_url, login, name } = await getGithubUser({ access_token });
  
      // Create new user or update user if user already exist
      const user = await this.accountService.findAndUpdateUserFromGithub(
        { id,
          email,
          name,
          photo: avatar_url,
          login,
          provider: 'GitHub',
          verified: true,
        }
      )

      debug('user returned')
  
      if (!user) {
        debug('user not found')
        throw new AuthorizationError('User not found', { errorCode: '03' })
      }

      debug(user)
  
      const { accessToken, refreshToken, accessTokenCookieOptions, refreshTokenCookieOptions} = await this.getAccessTokens(user)
      
      debug('Access tokens created')
      return { accessToken, refreshToken, accessTokenCookieOptions, refreshTokenCookieOptions}

    } catch (err) {
      throw new AuthorizationError('Could not authenticate', { errorCode: '05' }, err)
    }
  }
}


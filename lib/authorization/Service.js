import axios from 'axios'
import qs from 'qs'

import { getAccountService } from '@/lib/accounts/Service.js'
import { getSessionService } from '@/lib/sessions/Service.js'
import { getCredentialService } from '@/lib/credentials/Service.js'
import { debug } from '@/lib/logger.js'

class AuthorizationError extends Error {
  constructor(message, data, err) {
    super(message, err)
    this.data = data
  }
}

export const getGoogleOauthToken = async ({ code }, config) => {
  const rootURl = 'https://oauth2.googleapis.com/token'

  const options = {
    code,
    client_id: config.public.googleOAuthClientId,
    client_secret: config.googleOAuthClientSecret,
    redirect_uri: config.googleOAuthRedirect,
    grant_type: 'authorization_code',
  }
  try {
    const { data } = await axios.post(
      rootURl,
      qs.stringify(options),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return data;
  } catch (err) {
    console.log('Failed to fetch Google Oauth Tokens');
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
  const rootUrl = 'https://github.com/login/oauth/access_token';
  const options = {
    client_id: config.public.githubOAuthClientId,
    client_secret: config.githubOAuthClientSecret,
    code,
  };

  try {
    const { data } = await axios.post(`${rootUrl}`, options,
    {
      headers: {
        'Content-Type': 'application/json',
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
      'https://api.github.com/user',
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
  const accountService = getAccountService(config)
  const sessionService = getSessionService(config)
  const credentialService = getCredentialService(config)
  return new AuthorizationService( config, accountService, sessionService, credentialService)
}
export class AuthorizationService {
  constructor(config, accountService, sessionService, credentialService ) {
    this.config = config
    this.accountService = accountService
    this.sessionService = sessionService
    this.credentialService = credentialService
  }

  async signIn( { email, password }) {
    const account = await this.accountService.getAccountByEmail(email)
    
    if (!account) {
      return { 
        result: 'error', 
        msg: 'Account not found for ' + email 
      }
    }
  
    if (!account.active) {
      return { 
        result: 'error', 
        msg: 'Account not activated '
      }
    }
  
    const isPasswordCorrect = this.credentialService.isValid({ email, password })
    if (! isPasswordCorrect) {
      return {
        result: 'error',
        message: 'Email or password invalid.'
      }
    }
  
    const { accessToken, refreshToken, accessTokenCookieOptions, refreshTokenCookieOptions} = await this.sessionService.getAccessTokens(account)
      
    debug('Access tokens created')
    return { result: 'ok',  accessToken, refreshToken, accessTokenCookieOptions, refreshTokenCookieOptions }
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
  
      const { accessToken, refreshToken, accessTokenCookieOptions, refreshTokenCookieOptions} = await this.sessionService.getAccessTokens(user)
      
      debug('Access tokens created')
      return { accessToken, refreshToken, accessTokenCookieOptions, refreshTokenCookieOptions}

    } catch (err) {
      throw new AuthorizationError('Could not authenticate', { errorCode: '05' }, err)
    }
  }
}


import axios, { formToJSON } from "axios"
import qs from "qs"
import { signJwt } from "./jwt-utils.js";

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
    console.log( data )
    return data;
  } catch (err) {
    throw Error('Error getting github user:' + err.message, err)
  }
}

export const signTokens = async (user, config) => {
  try {
    const access_token = signJwt({ sub: user.id },
      { key: config.accessTokenPrivateKey, passphrase:  config.keyPassword }, {
      expiresIn: `${config.accessTokenExpiresIn}m`,
    })

    const refresh_token = signJwt({ sub: user.id }, { key: config.refreshTokenPrivateKey, passphrase:  config.keyPassword }, {
      expiresIn: `${config.refreshTokenExpiresIn}m`,
    })

    return { access_token, refresh_token }
  } catch(e) {
    console.log(e)
    throw new Error(e)
  }
}
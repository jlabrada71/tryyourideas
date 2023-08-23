export function replace (s, s1, s2) {
  return s.split(s1).join(s2)
}

export function safeUrl (s) {
  const tokens = [{ what: ' ', by: '-' },
    { what: '?', by: '-' },
    { what: '!', by: '-' },
    { what: '.', by: '-' },
    { what: '\'', by: '-' },
    { what: ':', by: '-' },
    { what: '--', by: '-' }]
  let result = s.toLowerCase()
  tokens.forEach((token) => {
    result = replace(result, token.what, token.by)
  })
  while (result.lastIndexOf('-') === result.length - 1) {
    result = result.substring(0, result.lastIndexOf('-'))
  }
  return result
}

export function toQuery (obj) {
  let queryString = ''
  if (obj) {
    let operator = '?'
    const keys = Object.keys(obj)
    keys.forEach((key) => {
      queryString += `${operator}${key}=${obj[key]}`
      operator = '&'
    })
  }
  return queryString
}

export function accessToken () {
  if (process.browser) {
    const token = window.localStorage.getItem('accessToken')
    const authorization = `Bearer ${token}`
    return {
      headers: {
        Authorization: authorization
      }
    }
  }
}

export function replaceUrlParameters(params, url) {
  return params.reduce((p, c) => p.replaceAll(`{${c.name}}`, c.value ), url)
}

export function removeRelativePath(url) {
  const localhost = 'http://localhost:3400'
  const production = 'https://resources.tryyourideas.com'
  if (url.startsWith(localhost) || url.startsWith(production)) {
    const newValue = '/' + url.split('/').splice(6).join('/')
    return newValue
  }
  return url
}


export function getGitHubOAuthUrl(from, clientId, redirectUrl, scope = 'user:mail') {
  const rootURl = 'https://github.com/login/oauth/authorize'

  const options = {
    client_id: clientId,
    redirect_uri: redirectUrl,
    scope: scope,
    state: from,
  }

  const qs = new URLSearchParams(options);

  return `${rootURl}?${qs.toString()}`;
}

export function getGoogleOAuthUrl (from, clientId, redirectUrl, scope = [ 
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ]
) {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`

  const options = {
    redirect_uri: redirectUrl,
    client_id: clientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: scope.join(' '),
    state: from,
  }

  const qs = new URLSearchParams(options)

  return `${rootUrl}?${qs.toString()}`
}

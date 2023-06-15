import jwt from 'jsonwebtoken'

export const signJwt = (
  payload,
  key,
  options  // : SignOptions
) => {
  return jwt.sign(payload, key, {
    ...(options && options),
    algorithm: 'RS512',
  })
}

export const verifyJwt = (
  token, // : string,
  key
) => {
  try {
    return jwt.verify(token, key)
  } catch (error) {
    return null
  }
}

export const decodeJwt = (
  token, // : string,
  key
) => {
  try {
    return jwt.decode(token, key)
  } catch (error) {
    return null
  }
}

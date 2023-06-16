import jwt from 'jsonwebtoken'
import { log } from '@/lib/logger.js'

export const signJwt = (
  payload,
  key,
  options  // : SignOptions
) => {
  try {
    return jwt.sign(payload, key, {
      ...(options && options),
      algorithm: 'RS512',
    })
  } catch(e) {
    log(e.message)
    log(payload)
    log(options)
    return null
  }
}

export const verifyJwt = (
  token, // : string,
  key
) => {
  try {
    return jwt.verify(token, key)
  } catch (error) {
    log(error.message)
    log(token)
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
    log(error.message)
    log(token)
    return null
  }
}

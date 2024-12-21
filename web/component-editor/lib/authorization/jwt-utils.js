import jwt from 'jsonwebtoken'

// surround the  call with a try catch for errors
export const signJwt = ( payload, key, options) => jwt.sign(payload, key, {
      ...(options && options),
      algorithm: 'RS512',
    })

// surround the  call with a try catch for errors
export const verifyJwt = ( token, key, options ) => jwt.verify(token, key, options)

// surround the  call with a try catch for errors
export const decodeJwt = ( token, key, options ) => jwt.decode(token, key, options)

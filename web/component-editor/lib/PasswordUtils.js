import { pbkdf2Sync, randomBytes } from 'node:crypto'

export function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
  return savedHash == pbkdf2Sync(passwordAttempt, savedSalt, savedIterations, 64, 'sha512').toString('hex');
}

export function hashPassword(password, bytes ) {
  const saltBase = bytes || randomBytes(128);
  const salt = saltBase.toString('base64');
  const iterations = 10000;
  const hash = pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');

  return {
      salt: salt,
      hash: hash,
      iterations: iterations
  }
}
import { idFromEmail } from '../IdGeneration.js'
import { hashPassword } from '../PasswordUtils'
import { CredentialRepository } from '../CredentialRepository'

export function getCredentialService(config) {
  const credentialRepository = new CredentialRepository(config)
  return new CredentialService(credentialRepository, idFromEmail, hashPassword)
}

export class CredentialService {
  constructor(credentialRepository, idCreator, hasher) {
    this.credentialRepository = credentialRepository
    this.idCreator = idCreator
    this.hasher = hasher
  }

  newCredentials({ email, password }) {
    return {
      id: this.idCreator(email),
      email,
      password: this.hasher(`${email}::${password}`),
    }
  }

  add( { email, password }) {
    const credentials = this.newCredentials( { email, password })
    this.credentialRepository.insert(credentials)
  }
}
import { idFromEmail, getRandomId } from '@/lib/IdGeneration.js'
import { hashPassword, isPasswordCorrect } from '@/lib/PasswordUtils.js'
import { CredentialRepository } from '@/lib/CredentialRepository.js'
import { AccountRepository } from '@/lib/accounts/Repository.js'
import { getSessionService } from '@/lib/sessions/Service.js'
import { debug } from '@/lib/logger.js'

export function getCredentialService(config) {
  const credentialRepository = new CredentialRepository(config)
  const accountRepository = new AccountRepository(config)
  const sessionService = new getSessionService(config)
  return new CredentialService(
    credentialRepository, 
    accountRepository,
    sessionService,
    idFromEmail, 
    getRandomId,
    hashPassword)
}

export class CredentialService {
  constructor(credentialRepository, 
      accountRepository, 
      sessionService,
      idCreator,
      randomIdCreator,
      hasher) {
    this.credentialRepository = credentialRepository
    this.accountRepository = accountRepository
    this.sessionService = sessionService
    this.idCreator = idCreator
    this.randomIdCreator = randomIdCreator
    this.hasher = hasher
  }

  newCredentials({ email, password }) {
    return {
      id: this.idCreator(email),
      email,
      password: this.hasher(`${email}::${password}`),
    }
  }

  async add( { email, password }) {
    const credentials = this.newCredentials( { email, password })
    await this.credentialRepository.insert(credentials)
  }

  async getCredentialsByEmail(email) {
    const accounts = await this.credentialRepository.select( credential => credential.email === email )

    if (accounts.length > 0) {
      debug('Credentials found')
      return accounts[0]
    }

    debug('Error in credentials')
    throw new Error('Credentials not found for email: ' + email)
  }

  async isValid( { email, password }) {
    const credentials = await this.getCredentialsByEmail(email)
  
    if (!credentials) {
      return { 
        result: 'error', 
        msg: 'Credential not found for ' + email 
      }
    }

    const isCorrect = isPasswordCorrect(credentials.password.hash, credentials.password.salt, credentials.password.iterations, `${email}::${password}`)
    return isCorrect
  }
}
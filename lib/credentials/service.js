import { idFromEmail, getRandomId } from '@/lib/IdGeneration.js'
import { hashPassword, isPasswordCorrect } from '@/lib/PasswordUtils.js'
import { CredentialRepository } from '@/lib/CredentialRepository.js'
import { AccountRepository } from '@/lib/accounts/Repository.js'
import { SessionRepository } from '@/lib/SessionRepository.js'

export function getCredentialService(config) {
  const credentialRepository = new CredentialRepository(config)
  const accountRepository = new AccountRepository(config)
  const sessionRepository = new SessionRepository(config)
  return new CredentialService(
    credentialRepository, 
    accountRepository,
    sessionRepository,
    idFromEmail, 
    getRandomId,
    hashPassword)
}

export class CredentialService {
  constructor(credentialRepository, 
      accountRepository, 
      sessionRepository,
      idCreator,
      randomIdCreator,
      hasher) {
    this.credentialRepository = credentialRepository
    this.accountRepository = accountRepository
    this.sessionRepository = sessionRepository
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

  createSession(email) {
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);
    return {
      id: this.randomIdCreator(),
      email,
      expires,
      active: true
    }
  }

  async add( { email, password }) {
    const credentials = this.newCredentials( { email, password })
    await this.credentialRepository.insert(credentials)
  }

  async signIn( { email, password }) {
    const existingAccounts = await this.accountRepository.select(acc => acc.email === email)
    
    if (existingAccounts.length === 0) {
      return { 
        result: 'error', 
        msg: 'Account not found for ' + email 
      }
    }
    const account = existingAccounts[0]
  
    if (!account.active) {
      return { 
        result: 'error', 
        msg: 'Account not activated '
      }
    }
  
    const existingCredentials = await this.credentialRepository.select(acc => acc.email === email)
  
    if (existingCredentials.length === 0) {
      return { 
        result: 'error', 
        msg: 'Account not found for ' + email 
      }
    }
    const credential = existingCredentials[0]
    const isCorrect = isPasswordCorrect(credential.password.hash, credential.password.salt, credential.password.iterations, `${email}::${password}`)
  
    if (!isCorrect) {
      return { 
        result: 'error', 
        msg: 'Invalid email or password ' 
      }
    }
  
    const session = this.createSession(email)
  
    await this.sessionRepository.insert(session)
  
    return { result: 'ok', session }
  }
}
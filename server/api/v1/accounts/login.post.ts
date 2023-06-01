// curl -H "Content-Type: application/json" -d '{"name": "jlabrada", "email":"jlabrada@yahoo.com"}' -X POST 'localhost:3000/api/v1/accounts'
import { log, debug } from '@/lib/logger'
import { getRandomId } from '@/lib/IdGeneration'
import { SessionRepository } from '@/lib/SessionRepository'
import { CredentialRepository } from '@/lib/CredentialRepository'
import { AccountRepository } from '@/lib/AccountRepository'
import { isPasswordCorrect } from '@/lib/PasswordUtils'

const config = useRuntimeConfig()
const sessionRepository = new SessionRepository(config)
const credentialRepository = new CredentialRepository(config)
const accountRepository = new AccountRepository(config)

function createSession(email: string) {
  const expires = new Date();
  expires.setHours(expires.getHours() + 24);
  return {
    id: getRandomId(),
    email,
    expires,
    active: true
  }
}

export default defineEventHandler(async (event) => {
  log('account login POST')
  const body = await readBody(event)
  const existingAccounts = await accountRepository.select(acc => acc.email === body.email)
  
  if (existingAccounts.length === 0) {
    return { 
      result: 'error', 
      msg: 'Account not found for ' + body.email 
    }
  }
  const account = existingAccounts[0]

  if (!account.active) {
    return { 
      result: 'error', 
      msg: 'Account not activated '
    }
  }

  const existingCredentials = await credentialRepository.select(acc => acc.email === body.email)

  if (existingCredentials.length === 0) {
    return { 
      result: 'error', 
      msg: 'Account not found for ' + body.email 
    }
  }
  const credential = existingCredentials[0]
  const isCorrect = isPasswordCorrect(credential.password.hash, credential.password.salt, credential.password.iterations, `${body.email}::${body.password}`)

  if (!isCorrect) {
    return { 
      result: 'error', 
      msg: 'Invalid email or password ' 
    }
  }

  const session = createSession(body.email)

  await sessionRepository.insert(session)

  return { result: 'ok', session }
})

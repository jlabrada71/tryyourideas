// curl -H "Content-Type: application/json" -d '{"name": "jlabrada", "email":"jlabrada@yahoo.com"}' -X POST 'localhost:3000/api/v1/accounts'
import { log, debug } from '@/lib/logger'
import { idFromEmail } from '@/lib/IdGeneration'
import { FileRepository } from '@/lib/FileRepository'

const config = useRuntimeConfig() 
const repository = new FileRepository(`${config.data}/accounts/accounts.json`, { createIfNotExists: true })


function createNewAccount( { name, email }) {
  const account = {
    id: idFromEmail( email ),
    name, 
    email,
    licence: 'community',
    maxProjects: 1
  }
  return account
}

export default defineEventHandler(async (event) => {
  log('account POST')
  const body = await readBody(event)
  const account = createNewAccount({ name: body.name, email: body.email })
  const existingAccounts = await repository.select(acc => acc.email === account.email)
  if (existingAccounts.length > 0) {
    return { 
      result: 'error', 
      msg: 'Existing account with same email' 
    }
  }
  repository.insert(account)
  return { result: 'ok', account }
})

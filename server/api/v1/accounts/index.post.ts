// curl -H "Content-Type: application/json" -d '{"name": "jlabrada", "email":"jlabrada@yahoo.com"}' -X POST 'localhost:3000/api/v1/accounts'
import { log, debug } from '@/lib/logger'
import { idFromEmail, getRandomId } from '@/lib/IdGeneration'
import { CredentialRepository } from '@/lib/CredentialRepository'
import { AccountRepository } from '@/lib/AccountRepository'
import { hashPassword } from '@/lib/PasswordUtils'
import axios from 'axios'

const config = useRuntimeConfig() 
const accountRepository = new AccountRepository(config)
const credentialRepository = new CredentialRepository(config)


function createNewAccount( { name, email, mailing }) {
  const account = {
    id: idFromEmail(email),
    name, 
    email,
    licence: 'community',
    maxProjects: 1,
    mailing,
    activationCode: getRandomId(),
    active: false
  }
  return account
}

function createNewCredentials({ email, password }) {
  return {
    id: idFromEmail(email),
    email,
    password: hashPassword(`${email}::${password}`),
  }
}

function postToServer(obj, url: string) {
  log('POSTING to ' + url)
  log(JSON.stringify(obj, null, 2))
  return axios({
    method: 'post',
    url,
    data: obj
  });
}

async function sendActivationEmail(account) {
  const result = `<html>
        <body>
          Hi ${account.name}<br><br> 
          Thank you for joining our community.<br>
          In order to activate your account click on the link below or copy and paste the link in your browser.
          
          <a href="https://www.tryyourideas.com/activation?code=${account.activationCode}&email=${account.email}">Activate Here</a><br>
         
          <br>
          <br>
          Kind regards<br>
          The TryYourIdeas team<br>
          <br>
        </body>
        </html> `

    try {
      await postToServer({ title: 'Account Activation', email: account.email, content: result }, config.notificationsApi)
      log('email sent')
    }
    catch(e) {
      log('Error sending email')
      log(e)
    }

}

export default defineEventHandler(async (event) => {
  log('account POST')
  const body = await readBody(event)

  const existingAccounts = await accountRepository.select(acc => acc.email === body.email)
  if (existingAccounts.length > 0) {
    return { 
      result: 'error', 
      msg: 'Existing account with same email' 
    }
  }

  const account = createNewAccount({ name: body.name, email: body.email, mailing: body.mailing })
  await accountRepository.insert(account)
  const credential = createNewCredentials({ email: body.email, password: body.password })
  await credentialRepository.insert(credential)
  await sendActivationEmail(account)

  return { result: 'ok' }
})

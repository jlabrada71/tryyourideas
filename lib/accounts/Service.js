import { idFromEmail, getRandomId } from '@/lib/IdGeneration.js'
import { AccountRepository } from '@/lib/accounts/Repository.js'
import { getCredentialService } from '@/lib/credentials/Service.js'
import { getEmailService } from '@/lib/emails/Service.js'
import { debug, log } from '@/lib/logger.js'

export function getAccountService(config) {
  const accountRepository = new AccountRepository(config)
  const credentialService = getCredentialService(config)
  const emailService = getEmailService(config)
  return new AccountService(accountRepository, credentialService, emailService, idFromEmail, getRandomId )
}

export class AccountService {
  constructor(accountRepository, credentialService, emailService, idCreator, activationCodeCreator) {
    this.accountRepository = accountRepository
    this.credentialService = credentialService
    this.emailService = emailService
    this.idCreator = idCreator
    this.activationCodeCreator = activationCodeCreator
  }

  newAccount( { name, email, mailing, licence = 'community', maxProjects = 1 }) {
    debug('newAccount function')
    debug(email)
    const account = {
      id: this.idCreator(email),
      name, 
      email,
      licence,
      maxProjects,
      mailing,
      activationCode: this.activationCodeCreator(),
      active: false
    }
    debug('newAccount function end')
    return account
  }

  async add({ name, email, mailing, password }) {
    try {
      const existingAccounts = await this.accountRepository.select(acc => acc.email === email)
      if (existingAccounts.length > 0) {
        return { 
          result: 'error', 
          msg: 'Existing account with same email' 
        }
      } 

      const account = this.newAccount({ name, email, mailing })
      await this.accountRepository.insert(account)
      await this.credentialService.add({ email, password })
      await this.sendActivationEmail(account)
      return {
        result: 'ok'
      }
    } catch(e) {
      debug(e.message)
      return {
        result: 'error',
        msg: e.message
      }
    }
  }

  async sendActivationEmail(account) {
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
        await this.emailService.send({ title: 'Account Activation', email: account.email, content: result })
      }
      catch(e) {
        log(`Error sending email: ${e.message}`)
        log(`address: ${account.email}`)
        log(e)
      }
  }

  createFakeEmail() {
    const d = Date.now()
    const d2 = new Date(2023, 5, 25).getTime()
    const c = Math.abs(d - d2)
    return `${c}@fakemail.com`
  }

  async update(account) {
    return await this.accountRepository.update( account  )
  }


  async getAccountById(id) {
    const accounts = await this.accountRepository.select( account => account.id === id )

    if (accounts.length > 0) {
      debug('Account found')
      return accounts[0]
    }

    debug('Error in accounts')
    throw new Error('Account not found for ID: ' + id)
  }

  async getAccountByEmail(email) {
    const accounts = await this.accountRepository.select( account => account.email === email )

    if (accounts.length > 0) {
      debug('Account found')
      return accounts[0]
    }

    debug('Error in accounts')
    throw new Error('Account not found for email: ' + email)
  }

  async findAndUpdateUserFromGithub({
    id,
    email,
    name,
    photo,
    login,
    provider,
    verified,
  }) {

    
    const accounts = await this.accountRepository.select( account => account.email === email )

    if (accounts.length == 1) {
      debug('Account found')
      const account = accounts[0]
      account.active = true
      account.name = account.name || name
      account.photo = account.photo || photo
      account.github = { id, email, name, photo, login, verified }
      account.provider = provider
      await this.accountRepository.update(account)
      return account
    }

    if (accounts.length > 1) {
      debug('Error in accounts')
      throw new Error('Duplicate accounts for email: ' + email)
    }

    const userEmail = email || this.createFakeEmail()
    debug('User Email')
    debug(userEmail)

    const githubAccounts = await this.accountRepository.select( account => account.github && account.github.id === id )
    if (githubAccounts.length == 1) {
      debug('Github account found')
      const githubAccount = githubAccounts[0]

      githubAccount.active = true
      githubAccount.email = userEmail
      githubAccount.name = githubAccount.name || name
      githubAccount.photo = githubAccount.photo || photo
      githubAccount.github = { id, email: userEmail, name, photo, login, verified }
      githubAccount.provider = provider
      await this.accountRepository.update(githubAccount)
      return githubAccount
    }

    debug('No account found, creating new account')

    const newAccount = this.newAccount({ name, email: userEmail, mailing: true })
    debug(userEmail)
    newAccount.active = true
    newAccount.photo = photo
    newAccount.github = { id, email: userEmail, name, photo, login, verified }
    newAccount.provider = provider
    try {
      debug('Inserting in service')
      await this.accountRepository.insert(newAccount)
    } catch (e) {
      console.log(e)
    }
    
    return newAccount
  }
}


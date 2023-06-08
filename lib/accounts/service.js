import { idFromEmail, getRandomId } from '@/lib/IdGeneration'
import { AccountRepository } from '@/lib/AccountRepository'
import { getCredentialService } from '@/lib/credentials/service'
import { getEmailService } from '@/lib/emails/service'

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

  newAccount( { name, email, mailing }) {
    const account = {
      id: this.idCreator(email),
      name, 
      email,
      licence: 'community',
      maxProjects: 1,
      mailing,
      activationCode: this.activationCodeCreator(),
      active: false
    }
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
        log('Error sending email')
        log(e)
      }
  }
}



import { AccountService } from '@/lib/accounts/service.js'

describe('send function', () => {
  describe('given a body calls the email sender send function with the body', () => {
    const accountRepository = {
      insert(value) {
        this.value = value
      },
      select () {
        return []
      }
    }

    const credentialService = {
      add(value) {
        this.value = value
      }
    }

    const emailService = {
      send(value) {
        this.value = value
      }
    }

    const idCreatorList = []
    function idCreator( x ) {
      idCreatorList.push(x)
      return x
    }

    const activationCodeList = []
    function activationCodeCreator() {
      activationCodeList.push(activationCodeList.length + 1)
      return activationCodeList.length
    }
   
    const accountService = new AccountService(
        accountRepository, 
        credentialService,
        emailService,      
        idCreator, 
        activationCodeCreator
      )
    accountService.add({email: 'this is an email', password: 'this is a password', name: 'Juan'})
    it(' should store the email', () => {
      expect(accountRepository.value.email).toBe('this is an email')
    })

    it(' should store the id', () => {
      expect(accountRepository.value.id).toBe('this is an email')
    })

    it(' should store the hashed password', () => {
      expect(credentialService.value.password).toBe('this is a password')
      expect(credentialService.value.email).toBe('this is an email')
    })

    it(' should generate the id from the email', () => {
      expect(idCreatorList.length).toBe(1)
      expect(idCreatorList[0]).toBe('this is an email')
    })

    it(' should generate an account id', () => {
      expect(accountRepository.value.id).toBe('this is an email')
    })

    it(' should generate an activation code', () => {
      expect(accountRepository.value.activationCode).toBe(1)
      expect(activationCodeList.length).toBe(1)
      expect(activationCodeList[0]).toBe(1)
    })

    it(' should send an activation email', () => {
      expect(emailService.value.title).toBe('Account Activation')
      expect(emailService.value.email).toBe('this is an email')
      expect(emailService.value.content).toContain('this is an email')
      expect(emailService.value.content).toContain('code=1')
    })
  })
})



import { 
  CredentialService
 } from '@/lib/credentials/service.js'

describe('send function', () => {
  describe('given a body calls the email sender send function with the body', () => {
    const credentialRepository = {
      insert(body) {
        this.body = body
      }
    }

    const idCreatorList = []
    function idCreator( x ) {
      idCreatorList.push(x)
      return x
    }

    const hasherList = []
    function hasher( x ) {
      hasherList.push( x )
      return x
    }

    const accountRepository = {

    }

    const sessionRepository = {
      
    }

    const randomIdCreator = () => 10
   
    const credentialService = new CredentialService(credentialRepository, accountRepository, sessionRepository, idCreator, randomIdCreator, hasher)
    credentialService.add({email: 'this is an email', password: 'this is a password'})
    it(' should store the email', () => {
      expect(credentialRepository.body.email).toBe('this is an email')
    })

    it(' should store the id', () => {
      expect(credentialRepository.body.id).toBe('this is an email')
    })

    it(' should store the hashed password', () => {
      expect(credentialRepository.body.password).toBe('this is an email::this is a password')
    })

    it(' should generate the id from the email', () => {
      expect(idCreatorList.length).toBe(1)
      expect(idCreatorList[0]).toBe('this is an email')
    })

    it(' should hash the email with the password', () => {
      expect(hasherList.length).toBe(1)
      expect(hasherList[0]).toBe('this is an email::this is a password')
    })
  })
})


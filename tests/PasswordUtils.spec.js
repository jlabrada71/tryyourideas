
import { 
  hashPassword,
  isPasswordCorrect
 } from '../lib/PasswordUtils.js'

describe('getReplacedUrl function', () => {
  describe('hashing some text', () => {
    
    it('/testurl/tonton.svg', async () => {
      const { createHash } = await import('node:crypto');

      const secret = 'abcdefg'
      const hash = createHash('sha256')
                    .update(secret)
                    .digest('hex');
      expect(hash).toBe('7d1a54127b222502f5b79b5fb0803061152a44f92b37e23c6527baf665d4da9a')
    })
  })

  describe('hashing a password with salt', () => {
    
    it('it should match', async () => {
      
      const optionalSaltBase = Buffer.from([1, 2, 3]);
      const secret = 'password'
      const hash = hashPassword(secret, optionalSaltBase)

      expect(hash.salt).toBe('AQID')
      expect(hash.hash).toBe('a81e806cb55846e93df7826ed717f968012d4c315e3f7ddc9311aa7ea676bb5fd0c35cdcd2a70f977d1d45e7f55bdc4dd9d6cc0cca52c3cd79a1b59f05cdbe9e')
      expect(hash.iterations).toBe(10000)

      const isCorrect = isPasswordCorrect(hash.hash, hash.salt, hash.iterations, secret)

      expect(isCorrect).toBe(true)
    })
  })
})

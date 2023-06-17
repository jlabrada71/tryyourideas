
import { 
  hashPassword,
  isPasswordCorrect
 } from '../lib/PasswordUtils.js'

 import jwt from 'jsonwebtoken'

 import { signJwt, verifyJwt } from '@/lib/authorization/jwt-utils.js'

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

describe('jwt ES512', () => {
  describe('hashing some text', () => {

    it('test', async () => {
      const privateKey =
`-----BEGIN EC PRIVATE KEY-----
MIHcAgEBBEIADk5+jdybNzMhV+QpX8CKqB5CvvA3U+fn/8Bd2y2k20+AqxYqPcWS
dZGfSQg/kV7qN0MjMkh61Xzo/KBKuICOIPCgBwYFK4EEACOhgYkDgYYABAD2LKXX
BeYluETiIiRD1cwmiGUtYxPg3dVV4a7rOJEnWpxgh0Z8UmslSoYOJtMsX7CaCqcK
3iXuJx4dieSoJQKhdwDH4JAjGFLDApn0vgmUGZk6EoG078ZvqfmFS6CaI2UxWPwq
fwkuCmRoOudLqmCbSkP10j2c0LTra3D4JodPxwprHw==
-----END EC PRIVATE KEY-----
`;
const publicKey =
`-----BEGIN PUBLIC KEY-----
MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQA9iyl1wXmJbhE4iIkQ9XMJohlLWMT
4N3VVeGu6ziRJ1qcYIdGfFJrJUqGDibTLF+wmgqnCt4l7iceHYnkqCUCoXcAx+CQ
IxhSwwKZ9L4JlBmZOhKBtO/Gb6n5hUugmiNlMVj8Kn8JLgpkaDrnS6pgm0pD9dI9
nNC062tw+CaHT8cKax8=
-----END PUBLIC KEY-----
`;

        const data = {
            iss: 'https://domain.tld',
            sub: 'martin@mail.tld',
            aud: 'https://domain.tld',
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
            nbf: Math.floor(Date.now() / 1000),
            jti: 'asfasgsadg',
            data: { some: 'information' }
        };

        const encrypted = jwt.sign(data, privateKey, { algorithm: 'ES512' });

        const decrypted = jwt.verify(encrypted, publicKey, { algorithms: ['ES512'], audience: 'https://domain.tld', issuer: 'https://domain.tld' });

      expect(decrypted.data).toStrictEqual({ some: 'information' })
    })
  })
})

describe('jwt asymetric RS512', () => {
  const privateKey = 
`-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFHDBOBgkqhkiG9w0BBQ0wQTApBgkqhkiG9w0BBQwwHAQIKpiVT+My98kCAggA
MAwGCCqGSIb3DQIJBQAwFAYIKoZIhvcNAwcECJKNa1/50m7RBIIEyKgYRPsu2h8f
jJVp1yV/M2UJuBCskwnFLMu1H3iMZbUIGt8IorxnzL6pQP+eGXs1gdulfJzKrz8e
bFZRo4wDCbkQWTO6se7iLY7QjuHR8gCmz8c5MHid2qrxvDmFWXDKgkoEWrHVfAyo
71uyW5ZV45xhEKKlq/vDVl2cWUUaalIBNRIrJcf3iqBl5YKaBo4hYU2V8Gz1D870
brhLlnOwiCL2ncjFhSXntEWn+X4d9dhshfQzIcgHmAxfOT0G3D8pQ+WvSitQnTYb
0zynuKTpjX0AxPkAu2lSCDlRVtns2MLEyg9Iecp6B2HqdALZVSZtuo6kONQHsO6p
XlYedAehoZgT8nNSEWgH1xMEQ135R2e/2amWfc/OyussDDXByO2YqET5QzHPk1TM
6J2r6mrFhk6RKFtwY3S7g7ruM2E9MJz/V/Ptef9cNvLExkYPOHan6RTNDFXxRS+X
AwBswBKh53T8pDt4ajo0CO7k7lw3I8reaxDz84geNdaMHZfZXUg0+VblwoMdgD0n
Q1QyfFZMXgPWZzFSwyV/n55C5lVrROo/dzFqbZ1dgVs96OsO7E+/4Q3x9rGytPIr
EkVC4JRk0yl4zj2NEzDSRSle3fNcRHSFPNMjCuQWWScHHJfYhOoYwBR76LecCGhn
LI7sY3xfvY0zdXIquiVnW5tQvTrwXenKe4G086E2smGvD9mUbEPWUpc7vdmWMp64
ZAEH9pe0a6t07SnGYbq9SWZX7GvicNn5kgnJvf6QWfFtOUo3BuBBLHWW6I+L2D7g
zktrD//BllqC8iYhZjarm9BplEiKc0jexh3sNIkCJ7yRuxM+Vi0xlLz7NuvNX4+P
YKu4B/R0ZN1wbghesV0k7LaycIUj5kdrkj8zm1Asjfw37hM5273UxEDDMDYATuo2
OrnXwic3UtgmFjcFlfdKL+gv+LHZamc8zyasmxfvbs0lf/JTwZR0dGlUNL/8GOXY
oPwnMOEM+sBBBQHf8saT+LkR6KLJjHqgS32CvlL43F/APQRWqwFelWuG0r9XyBEa
U8OhfGilmy+zrwahzeVmyef1riC967zIjFktX8fGTha5P77Yi2jhtRNTgy0UYaWL
Rh+hgArB62dderGrjnI7BensWRPDEsOlyP49n9PNeK2iV4ur5Z/VWTllZl0Iq0C2
8T5RcGzYJzvAY7ToDuq3veDSej+g9Hhak1X/VoyAjaAp7FQ2JQmeV+6LoGg1NEyZ
W3sGX0jGfDcko5pYkv7QG/j/GyKvxcalcd5wH0F41CoRX0CecFsZV3cXQZpyDn/1
jGml/ozWhO2LxKnvcaT4jgv9sZEz5EPZ53sRvC5BDB9qFSEULR+PLWhVD8Kk8FgD
tSzXgoMjPWIeMGndi95F3pm1HJRGp3ZuEqyIeGtq1Qu1wOb9/F4nw30TbxXs7WOg
jI/i3kfbuSaJs+6fTmETdHu+eEX8AVj+qoqCQO6arlthqgUr4rH1adRG+0YkbFbb
VehoqpkAlbWP8ccpro2LLqUUTUJhfsCnMa/sBQHNPZFi7ORSr2F//6WiY+ROfWrY
Z5F2gRWxZ6c2xqka/xJFZORZ1r8WYLhCkBSHbo6cCOQfLzfG87J/iBFiK5tsa5hc
jyf7OUq/rmwYv4SWEDaueg==
-----END ENCRYPTED PRIVATE KEY-----`  

const publicKey = 
`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtFihuKQYEjjN10EWQ0pp
Lw+DK+H/ZHM56rIUJbjaEjOqamQ0V87oWsMObyfHIrX9vPp4DyYxb2SnDvKG+ykL
PmYC7wq9n7CoMwUtVNqPr0VYLv9mzmhHzgmDEK/pmjEzpCHWB4RVuren+x/t8EGs
TIB6dTFF8IkQOhzZJx8BozAZ/MJNwy8UQtskrfqAccmeRz1AHiNl1VNirERi5TbL
ZayO7NSSKu/N30Nc9s7fcOTCOgbflLMd6MpAPATVQ2E+9eHusray2EtXP0krI3Br
ULsE1Ssh5PiNV3DYRq3WoyrRjtAeGkE5ilEz96n1kSOQhudRUXC18OZ5dC/5ZgpY
nQIDAQAB
-----END PUBLIC KEY-----`

  describe('hashing some text', () => {

    const signed =  jwt.sign({ test: 'this is a test' }, { key: privateKey, passphrase: 'TestKey' }, {
      algorithm: 'RS512',
    })

    it('should return the same test', async () => {
         
      const verified =  jwt.verify(signed, publicKey, {
        algorithm: 'RS512',
      })

      expect(verified.test).toBe("this is a test")
    })
  })

  describe('passing issuer audience and subject', () => {

    const data = {
      iss: 'https://domain.tld',
      sub: 'martin@mail.tld',
      aud: 'https://domain.tld',
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
      nbf: Math.floor(Date.now() / 1000),
      jti: 'asfasgsadg',
      data: { some: 'information' }
    };

    const signed =  signJwt(data, { key: privateKey, passphrase: 'TestKey' }, {
      algorithm: 'RS512',
    })

    const rightVerifyOptions =  {
      algorithm: 'RS512',
      issuer: 'https://domain.tld',
      subject: 'martin@mail.tld',
      audience: 'https://domain.tld',
    }

    it('should contain the same data', async () => {
      const verified =  verifyJwt(signed, publicKey, rightVerifyOptions )

      expect(verified.data).toStrictEqual({some: "information" })
    })

    it('should contain the same subject', async () => {
      const verified =  verifyJwt(signed, publicKey, rightVerifyOptions)

      expect(verified.sub).toBe('martin@mail.tld')
    })

    const wrongAudienceOptions =  {
      algorithm: 'RS512',
      issuer: 'https://domain.tld',
      subject: 'martin@mail.tld',
      audience: 'https://domain.tldd',
    }

    it('should fail for the wrong audiece', async () => {

      const validate = () => {
        verifyJwt(signed, publicKey, wrongAudienceOptions )
      }

      expect(validate).toThrow(Error)
      expect(validate).toThrow('jwt audience invalid. expected: https://domain.tldd')
    })
  })

  describe('expired token', () => {

    const data = {
      iss: 'https://domain.tld',
      sub: 'martin@mail.tld',
      aud: 'https://domain.tld',
      exp: Math.floor(Date.now() / 1000) + (1), // 1 second
      nbf: Math.floor(Date.now() / 1000),
      jti: '0001',   //json token id
      data: { some: 'information' }
    };

    const signed =  signJwt(data, { key: privateKey, passphrase: 'TestKey' }, {
      algorithm: 'RS512',
    })

    const rightVerifyOptions =  {
      algorithm: 'RS512',
      issuer: 'https://domain.tld',
      subject: 'martin@mail.tld',
      audience: 'https://domain.tld',
    }

    const wait = (f, time) => new Promise((resolve, reject) => {
      setTimeout( () => {
        try {
          const r = f()
          resolve(r)
        } catch(e) {
          reject(e)
        }
      }, time)
    } )

    it('should throw an exception', async () => {
      expect.assertions(2);
      const verify = () => verifyJwt(signed, publicKey, rightVerifyOptions )
      try {
        await wait( verify, 2000 )
      } catch(e) {
        expect(e.constructor.name).toBe('TokenExpiredError')
        expect(e.message).toBe('jwt expired')
      }
    })
  })
})

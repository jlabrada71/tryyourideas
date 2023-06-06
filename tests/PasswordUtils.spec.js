
import { 
  hashPassword,
  isPasswordCorrect
 } from '../lib/PasswordUtils.js'

 import jwt from 'jsonwebtoken'

 import { signJwt, verifyJwt } from '../lib/authorization/jwt-utils.js'

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

describe('jwt function', () => {
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

    it('test', async () => {
      const privateKey = 
`-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFHDBOBgkqhkiG9w0BBQ0wQTApBgkqhkiG9w0BBQwwHAQIrXdPg8g2p7QCAggA
MAwGCCqGSIb3DQIJBQAwFAYIKoZIhvcNAwcECOWpLedGHAuRBIIEyFNqrZycVpW8
aT7NBLBYnaYgtLane3iYTvozawV4K30eatvtQSKWVL4SMd1MolmiCYnmE2IVnk0m
frfZ8T6PNPo6IebsMg+f6AgZ1wa3lsKXNlnwixbXIXLKbt5ylawug5y1Yw/MEOsb
yKD+/CFbsWuwVTAruaDA60rjQwbzmz5mKsBXaBnu8IeimBeT3pDOJR60IINnOxNi
jVgdU+2+4SlSCLIsZ/6+vAofYiROawl+/mPWZuoMPD8uH3KjoolaxxEVE3IUvkn1
kkUzcW/34/3PqiCKCbgKLj17su/oqpvbd1Fae92cZxJt+LyY7mPf8TMMRSre/VHO
Clhkm0ZumZ35U1L5CFoN8daGbS3MmvhxlMYeZd2RpB7BHz30xrwan1GsGm5q445w
VhqVG9y4j51v02BmGZdJHOvggouKHDqHu/bHFGjGINlvubQ/6NOgLsysD3w7kDyX
IibVVNy/44SO1ijznvirwsLKpsVbq7coCdK7SEsQSWvwhXtxK+0F/H/iAja0igQO
St7pwqd/A6w5M5ZrPfY7bZNtlpmnTX0iBUJ6VWgpQMzuEIQgKTjMI25wJHqLXH8+
Cr4f55TgKA8Y7zIfxTV4qCs2AeXdCOOKJqQ78l7O4QYzVtlITrIhP+Mis41u3wGw
cuFuNizz0B9K7DmUtd5enZuF6UfrPRzNX13pcJQf+r3ek7cjEqvdNxrRg2u8wjoU
iEkwLyX92uKJ30bwFEn3haJ9TApgEzcP8+XYiIK2ykvbDtPFq2v9yitSUscZU9Ew
ISTLOgjp8drGtO++fWIHBbBABoBX66HsxpQtNRsNwOTAaDaLy2++dEAKTyF4sKT9
v3xhHcygDhvfc/zAjK0Fqp5JpFK6yn1GQqoxcB68StaOTwkBYxizRjKENB1mmezh
Swvnre7DmP3TQ0bSGZm3p5YTw0iGB4i1kepLU0grZFGC2S9Dxq4f1bp59Zr2AoOf
U7NFZggrHizZzlNBdOg+XkGayhrmwaA+lLAR73hncB6CrNEcRxQnqQZOYWGQmFdR
0tJf/HFOy3Ha/3/u8ob/WWPQLR0MLM9RMmwfhX3HUtfnO6JeOB32dOa91X+Kizf+
w3oObE6AmhMP+tIrbIOlKDSUXDM6Hq8FcYZRJ3Lc9WfcNl0k2SncLSPSX8+7G7h4
zRNyhcEo4pN/N+rgMo7CSISHL4T+8vTjeN8PEfunvGmv6H1ggTcJCYTxoEK1Pzpj
487gdMcV8ceRED5MnBxxGf9RvJGEcM7tiCjAIkw101yN2XzkJMJ4m+89lMygn5sB
D1I7mbMhj7QbvubyHhk9RITiuddYfqdFgfSMplDJYvfrt+J4MR5ioQIrURZCOsfX
xlQnzBVwETBK0E9lwx74Y3fCqRMl3TaAJEttPsVoQYWVrmKzo+0PlceQZQ6J/M0q
Wh6y6kND7ly5cciTtmrjQMoQhOa60f/EqfIyGPoTDurEvFIvx97juKgsj8Y1Yhfq
B3ltiQWPXDquD9Slf1x8L2uILLM1+wg4Ieh/kkK+SCwAfIBgdz8kvQedPyoEzYf4
pHfB032s0ttoAHUs+s7nX/zfUY3NmCLywXnyTnMvyIGyCl+xxmCszg3RliLfaUyi
wFaTTJoV/jMlB4hdQsdcFQ==
-----END ENCRYPTED PRIVATE KEY-----`     

      const signed =  jwt.sign({ test: 'this is a test' }, { key: privateKey, passphrase: 'Ulloa%&91' }, {
        algorithm: 'RS512',
      })

      const publicKey = 
`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyeRlVn7t5QKzI4yZO639
QQFKcdLTPoPL/wt8xMzpJx8BMB7ZGc8ssnXwhfLqs68Die1V9HMucDrfY9UWUx2m
ReLT9emhw7noaVh9hKX1Uie2otuatNzRzJ3cPbPTuE3IuP+GvD0m7pvvlosAVXJg
HHFM4loSsI1yIPRHbPwldTFs7speVZFSY/EOOtGTCuBkMLnn9Y3eTH3ATgODQvht
hrouY9DYbr8phjbDs3JV354Pj3KvsVdioB1GRKOTlT+LtTPfpzMAco1ZufQ3xWS6
SkZ5/uo05c+B1yaHdf7FdMPDkmPmxexIwPxScMfbf7d51WhKRFHW1v8vwzRHnl0X
+wIDAQAB
-----END PUBLIC KEY-----`
      const verified =  jwt.verify(signed, publicKey, {
        algorithm: 'RS512',
      })

      expect(verified.test).toBe("this is a test")
    })
  })
})

describe('jwt function', () => {
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

    it('test', async () => {
      const privateKey = 
`-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFHDBOBgkqhkiG9w0BBQ0wQTApBgkqhkiG9w0BBQwwHAQIrXdPg8g2p7QCAggA
MAwGCCqGSIb3DQIJBQAwFAYIKoZIhvcNAwcECOWpLedGHAuRBIIEyFNqrZycVpW8
aT7NBLBYnaYgtLane3iYTvozawV4K30eatvtQSKWVL4SMd1MolmiCYnmE2IVnk0m
frfZ8T6PNPo6IebsMg+f6AgZ1wa3lsKXNlnwixbXIXLKbt5ylawug5y1Yw/MEOsb
yKD+/CFbsWuwVTAruaDA60rjQwbzmz5mKsBXaBnu8IeimBeT3pDOJR60IINnOxNi
jVgdU+2+4SlSCLIsZ/6+vAofYiROawl+/mPWZuoMPD8uH3KjoolaxxEVE3IUvkn1
kkUzcW/34/3PqiCKCbgKLj17su/oqpvbd1Fae92cZxJt+LyY7mPf8TMMRSre/VHO
Clhkm0ZumZ35U1L5CFoN8daGbS3MmvhxlMYeZd2RpB7BHz30xrwan1GsGm5q445w
VhqVG9y4j51v02BmGZdJHOvggouKHDqHu/bHFGjGINlvubQ/6NOgLsysD3w7kDyX
IibVVNy/44SO1ijznvirwsLKpsVbq7coCdK7SEsQSWvwhXtxK+0F/H/iAja0igQO
St7pwqd/A6w5M5ZrPfY7bZNtlpmnTX0iBUJ6VWgpQMzuEIQgKTjMI25wJHqLXH8+
Cr4f55TgKA8Y7zIfxTV4qCs2AeXdCOOKJqQ78l7O4QYzVtlITrIhP+Mis41u3wGw
cuFuNizz0B9K7DmUtd5enZuF6UfrPRzNX13pcJQf+r3ek7cjEqvdNxrRg2u8wjoU
iEkwLyX92uKJ30bwFEn3haJ9TApgEzcP8+XYiIK2ykvbDtPFq2v9yitSUscZU9Ew
ISTLOgjp8drGtO++fWIHBbBABoBX66HsxpQtNRsNwOTAaDaLy2++dEAKTyF4sKT9
v3xhHcygDhvfc/zAjK0Fqp5JpFK6yn1GQqoxcB68StaOTwkBYxizRjKENB1mmezh
Swvnre7DmP3TQ0bSGZm3p5YTw0iGB4i1kepLU0grZFGC2S9Dxq4f1bp59Zr2AoOf
U7NFZggrHizZzlNBdOg+XkGayhrmwaA+lLAR73hncB6CrNEcRxQnqQZOYWGQmFdR
0tJf/HFOy3Ha/3/u8ob/WWPQLR0MLM9RMmwfhX3HUtfnO6JeOB32dOa91X+Kizf+
w3oObE6AmhMP+tIrbIOlKDSUXDM6Hq8FcYZRJ3Lc9WfcNl0k2SncLSPSX8+7G7h4
zRNyhcEo4pN/N+rgMo7CSISHL4T+8vTjeN8PEfunvGmv6H1ggTcJCYTxoEK1Pzpj
487gdMcV8ceRED5MnBxxGf9RvJGEcM7tiCjAIkw101yN2XzkJMJ4m+89lMygn5sB
D1I7mbMhj7QbvubyHhk9RITiuddYfqdFgfSMplDJYvfrt+J4MR5ioQIrURZCOsfX
xlQnzBVwETBK0E9lwx74Y3fCqRMl3TaAJEttPsVoQYWVrmKzo+0PlceQZQ6J/M0q
Wh6y6kND7ly5cciTtmrjQMoQhOa60f/EqfIyGPoTDurEvFIvx97juKgsj8Y1Yhfq
B3ltiQWPXDquD9Slf1x8L2uILLM1+wg4Ieh/kkK+SCwAfIBgdz8kvQedPyoEzYf4
pHfB032s0ttoAHUs+s7nX/zfUY3NmCLywXnyTnMvyIGyCl+xxmCszg3RliLfaUyi
wFaTTJoV/jMlB4hdQsdcFQ==
-----END ENCRYPTED PRIVATE KEY-----`     

      const signed =  signJwt({ test: 'this is a test' }, { key: privateKey, passphrase: 'Ulloa%&91' }, {
        algorithm: 'RS512',
      })

      const publicKey = 
`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyeRlVn7t5QKzI4yZO639
QQFKcdLTPoPL/wt8xMzpJx8BMB7ZGc8ssnXwhfLqs68Die1V9HMucDrfY9UWUx2m
ReLT9emhw7noaVh9hKX1Uie2otuatNzRzJ3cPbPTuE3IuP+GvD0m7pvvlosAVXJg
HHFM4loSsI1yIPRHbPwldTFs7speVZFSY/EOOtGTCuBkMLnn9Y3eTH3ATgODQvht
hrouY9DYbr8phjbDs3JV354Pj3KvsVdioB1GRKOTlT+LtTPfpzMAco1ZufQ3xWS6
SkZ5/uo05c+B1yaHdf7FdMPDkmPmxexIwPxScMfbf7d51WhKRFHW1v8vwzRHnl0X
+wIDAQAB
-----END PUBLIC KEY-----`
      const verified =  verifyJwt(signed, publicKey)

      expect(verified.test).toBe("this is a test")

      const decoded = jwt.decode(signed, { complete: true })
      expect(decoded.header.alg).toBe("RS512")
      expect(decoded.header.typ).toBe("JWT")
      expect(decoded.payload.test).toBe('this is a test')
    })
  })
})
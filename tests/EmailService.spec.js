
import { 
  EmailService
 } from '../lib/emails/service.js'

describe('send function', () => {
  describe('given a body calls the email sender send function with the body', () => {
    const emailSender = {
      send(body) {
        this.body = body
      }
    }
    const emailService = new EmailService(emailSender)
    emailService.send({title: 'this is a test'})
    it(' should be "this is a test"', () => {
      expect(emailSender.body.title).toBe('this is a test')
    })
  })
})


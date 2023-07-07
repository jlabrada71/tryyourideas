import axios from 'axios'
import { debug } from '@/lib/logger.js'
import Mailer from '~/lib/emails/mailer.js'

export function getEmailService(config) {
  // const emailSender = new RestEmailSender(config)
  const emailSender = new SmtpEmailSender(config)
  return new EmailService(emailSender)
}

export class RestEmailSender {
  constructor(config) {
    this.config = config
  }

  send(body) {
    debug('POSTING to ' + this.config.notificationsApi)
    debug(JSON.stringify(body, null, 2))
    return axios({
      method: 'post',
      url: this.config.notificationsApi,
      data: body
    })
  }
}

export class SmtpEmailSender {
  constructor(config) {
    this.config = config
  }

  send (message) {
    const text = JSON.stringify(message.content, null, 2)
    debug(text)
    const envelop = {
      from: 'support@tryyourideas.com',
      to: message.email,
      subject: message.title,
      //  replyTo: nodeMailerUser,
      //  html: applicationSubmit({name: name, brand: brand, accountId: accountId, paymentEmail: paymentEmail, date: date, currency: currency, type: typeOfAccount})
      // text: message.content
      html: message.content
    }
  
    const account = {
      user: this.config.MAILER_ACCOUNT,
      pass: this.config.MAILER_PASS
    }
  
    const hostConfig = {
      host: 'smtp.zoho.com',
      port: 465,
      secure: true
    }
  
    const mailer = new Mailer(hostConfig, account)
    return mailer.send(envelop)
  }
}

export class EmailService {
  constructor(emailSender) {
    this.emailSender = emailSender
  }

  send(body) {
    return this.emailSender.send(body)
  }
}
import axios from 'axios'
import { debug } from '@/lib/logger.js'

export function getEmailService(config) {
  const emailSender = new RestEmailSender(config)
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

export class EmailService {
  constructor(emailSender) {
    this.emailSender = emailSender
  }

  send(body) {
    return this.emailSender.send(body)
  }
}
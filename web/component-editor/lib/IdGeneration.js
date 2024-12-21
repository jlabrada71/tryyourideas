import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'
import { debug } from '@/lib/logger.js'

export function getNextId(items) {
  const max = items.reduce((a, v) => Number(v.id) > a ? Number(v.id) : a, 0)
  return max + 1
}

export function idFromEmail(email) {
  debug(`idFromEmail: '${email}'`)
  if(!email) {
    throw new Error('Email is required')
  }
  // const MY_NAMESPACE = uuidv5('https://www.tryyourideas.com/', uuidv5.URL) === 'b5de7f0d-50a2-5c5d-beb3-6ee12a19ed20'
  const id =  uuidv5(email,'b5de7f0d-50a2-5c5d-beb3-6ee12a19ed20')
  debug(id)
  return id
}

export function getRandomId(options = {}) {
  debug('getRandomId')
  return uuidv4(options)
}
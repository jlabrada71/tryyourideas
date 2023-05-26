import { v5 as uuidv5, v4 as uuidv4 } from 'uuid'

export function getNextId(items) {
  const max = items.reduce((a, v) => Number(v.id) > a ? Number(v.id) : a, 0)
  return max + 1
}

export function idFromEmail(email) {
  const MY_NAMESPACE = uuidv5('https://www.tryyourideas.com/', uuidv5.URL)
  return uuidv5(email, MY_NAMESPACE)
}

export function getRandomId(options = {}) {
  return uuidv4(options)
}
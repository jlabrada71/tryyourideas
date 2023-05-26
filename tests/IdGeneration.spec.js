
import { getNextId, idFromEmail, getRandomId } from '../lib/IdGeneration.js'


describe('getNextId function', () => {
  describe('common case: given an array of object with id return the max id + 1', () => {
    const maxId = getNextId([{ id: '2' }, { id: '4' }])
    it('returns 3', () => {
      expect(maxId).toBe(5)
    })
  })

  describe('for an empty array should return 1', () => {
    const maxId = getNextId([])
    it('returns 1', () => {
      expect(maxId).toBe(1)
    })
  })
})

describe('getUserIdFromEmail function', () => {
  describe('common case: given an email return a UUID based on that email', () => {
    const id = idFromEmail('jlabrada@yahoo.com'); //?
    it('should be ', () => {
      expect(id).toBe('d85d4a74-8587-5800-9803-08d5ee7d6075')
    })
  })
})

describe('getRandomID function', () => {
  describe('common case: returns a random timestamp based UUID', () => {
    // when provided a random array option it always return the same value (used in tests)
    const id = getRandomId({ random: [ 0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36 ]}); //?

    it('should be ', () => {
      expect(id).toBe('109156be-c4fb-41ea-b1b4-efe1671c5836')
    })
  })
})


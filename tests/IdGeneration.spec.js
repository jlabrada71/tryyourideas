
import { getNextId } from '../lib/IdGeneration.js'



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


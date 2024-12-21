
import { toQuery } from '../lib/url-utils.js'


describe('toQuery function', () => {
  describe('common case: given an object with some keys return the query string', () => {
    const query = toQuery({ id: '2', name: 'juan' })
    it('returns "?id=2&name=juan"', () => {
      expect(query).toBe('?id=2&name=juan')
    })
  })
  describe('case: given an empty object return', () => {
    const query = toQuery({})
    it('returns "?id=2&name=juan"', () => {
      expect(query).toBe('')
    })
  })
})


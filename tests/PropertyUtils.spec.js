
import { 
  getReplacedUrl,
  generateProperties
 } from '../lib/PropertyUtils.js'

describe('getReplacedUrl function', () => {
  describe('given an item and a prop return the replaced url', () => {
    const props = [
        { name: 'test', value: 'tonton' },
        { name: 'category', value: 'brand' },
        { name: 'svg', url: '/testurl/{test}.svg' }
      ]
    const prop = { name: 'svg', url: '/testurl/{category}/{test}.svg' }
    it('/testurl/tonton.svg', () => {
      const url = getReplacedUrl(props, prop.url)
      expect(url).toBe('/testurl/brand/tonton.svg')
    })
  })
})

describe('generateProperties function', () => {
  describe('given an item and a prop return the replaced url', () => {
    const props = [
        { name: 'test', value: 'tonton' },
        { name: 'category', value: 'brand' },
        { name: 'svg', url: '/testurl/{test}.svg' }
      ]
    it('generates properties with values', () => {
      const url = generateProperties(props)
      expect(url).toBe('test="tonton" category="brand"')
    })

    it('does not generate properties with undefined values', () => {
      const url = generateProperties(props)
      expect(url.includes('svg')).toBe(false)
    })
  })
})


import { 
  getReplacedUrl,
  generateProperties,
  bindPropertyTo
 } from '@/lib/generators/ItemPropertyUtils.js'

describe ('getReplacedUrl function', () => {
  describe ('given an item and a prop return the replaced url', () => {
    const itemProps = [
        { name: 'test', value: 'tonton' },
        { name: 'category', value: 'brand' },
        { name: 'svg', url: '/testurl/{test}.svg' }
      ]
    const prop = { name: 'svg', url: '/testurl/{category}/{test}.svg' }
    it ('/testurl/tonton.svg', () => {
      const url = getReplacedUrl(itemProps, prop.url)
      expect(url).toBe('/testurl/brand/tonton.svg')
    })
  })
})

describe('bindPropertyTo function', () => {
  describe('', () => {
    const itemProp = { 
      name: 'test', 
      value: '', 
      isBinded: false, 
      bindTo: {name: '' } 
    }

    const component = {
      properties: [{
        id: 1,
        name: 'prop1',
        access: 'Write',
        default: 'value1',
        isRequired: true
      }]
    }

    bindPropertyTo(itemProp, component.properties[0])
    it ('should haved the bindTo property set to the component', () => {
      expect(itemProp.bindTo.id).toBe(1)
      expect(itemProp.bindTo.name).toBe('prop1')
    })

    it ('should haved the isBinded property set to true', () => {
      expect(itemProp.isBinded).toBe(true)
    })
  })
})

describe ('generateProperties function', () => {
  describe ('given an item and a prop return the replaced url', () => {
    const itemProps = [
        { name: 'test', value: 'tonton' },
        { name: 'category', value: 'brand' },
        { name: 'svg', url: '/testurl/{test}.svg' }
      ]
    it ('generates properties with values', () => {
      const url = generateProperties(itemProps)
      expect(url).toBe(' test="tonton" category="brand"')
    })

    it ('does not generate properties with undefined values', () => {
      const url = generateProperties(itemProps)
      expect(url.includes('svg')).toBe(false)
    })
  })

  describe ('given a binded read only generate the binding ', () => {
    const itemProps = [
      { 
        name: 'test', 
        value: 'test2', 
        isBinded: true, 
        bindTo: { category: 'property', name: 'prop1' } 
      },
    ]
    

    const component = {
      properties: [{
        id: 1,
        name: 'prop1',
        access: 'Write',
        default: 'value1',
        isRequired: true
      }]
    }

    it ('generates properties with values', () => {
      const url = generateProperties(itemProps, component)
      expect(url).toBe(':test="props.prop1" ')
    })
  })
})

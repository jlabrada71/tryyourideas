
import { itemToHtml } from '@/lib/generators/HtmlExporter.js'

describe('itemToHtml function', () => {
  describe('generate an icon code', () => {
    const item = {
      type: 'Icon',
      id: 'test',
      properties: [
        { name: 'test', value: 'tonton' },
        { name: 'category', value: 'brand' },
        { name: 'svg', value: '<svg xml="" ></svg>' }
      ],
      children: [],
      classes: []
    }
    
    it('generate simplest svg', () => {
      const svg = itemToHtml(item)
      expect(svg).toBe('<svg xml="" id="id-test"  class="" ></svg>')
    })
  })

  describe('generate binded code', () => {
    const item = {
      type: 'Icon',
      id: 'test',
      properties: [
        { name: 'test', value: 'tonton' },
        { name: 'category', value: 'brand' },
        { name: 'svg', value: '<svg xml="" ></svg>' }
      ],
      children: [],
      classes: []
    }
    
    it('generate simplest svg', () => {
      const svg = itemToHtml(item)
      expect(svg).toBe('<svg xml="" id="id-test"  class="" ></svg>')
    })
  })

  describe('generate img src', () => {
    const src = 'http://localhost:3000/uploads/users/undefined/Default/images/test/_DSC6980.JPG' 
    const result = '/' + src.split('/').splice(7).join('/')

    it('generate simplest svg', () => {
      
      expect(result).toBe('/images/test/_DSC6980.JPG')
    })
  })
})


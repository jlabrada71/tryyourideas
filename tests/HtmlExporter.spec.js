
import { itemToHtml } from '@/lib/generators/HtmlExporter.js'

describe('itemToHtml function', () => {
  describe('given an item and a prop return the replaced url', () => {
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
      const url = itemToHtml(item)
      expect(url).toBe('<svg xml="" id="id-test"  class="" ></svg>')
    })
  })
})
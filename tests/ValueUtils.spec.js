
import { 
  removeTag
 } from '../lib/ValueUtils.js'

 import { EditorStyles } from '../lib/EditorConstants.js'

describe('removeTag function', () => {
  describe('default delimiter', () => {
    const text = removeTag('this-value')
    
    it('should return "value"', async () => {
      expect(text).toBe('value')
    })
  })

  describe('"unset" value with default delimiter', () => {
    const text = removeTag(EditorStyles.UNSET)
    
    it('should return "unset"', async () => {
      expect(text).toBe(EditorStyles.UNSET)
    })
  })

  describe('expecified delimiter', () => {
    const text = removeTag('this-name-value', 'this-name-')
    
    it('should return "value"', async () => {
      expect(text).toBe('value')
    })
  })

  describe('"unset" value case', () => {
    const text = removeTag(EditorStyles.UNSET, 'this-name-')
    
    it('should return "unset"', async () => {
      expect(text).toBe(EditorStyles.UNSET)
    })
  })
})

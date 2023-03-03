
import { modifierAdder } from '../lib/EditorClassGenerator'

const getClassString = (( itemClass, f ) => `${f(itemClass.backgroundColor)} ${f(itemClass.width)} ${f(itemClass.height)} ${f(itemClass.padding)} ${f(itemClass.margin)}  ${f(itemClass.spacing)}
          ${f(itemClass.shadow)} ${f(itemClass.shadowColor)} 
          ${f(itemClass.borderRadius)} ${f(itemClass.borderWidth)} ${f(itemClass.borderStyle)} ${f(itemClass.borderColor)}
          ${f(itemClass.textColor)} ${f(itemClass.fontSize)}  ${f(itemClass.fontWeight)} ${f(itemClass.fontFamily)} ${f(itemClass.letterSpacing)} ${f(itemClass.lineHeight)}  ${f(itemClass.textAlign)} ${f(itemClass.textVerticalAlign)}
          ${f(itemClass.outlineColor)} 
          ${f(itemClass.ringColor)} 
          ${f(itemClass.divideColor)} 
          flex flex-wrap
          ` )

const getEditorClass = itemClass => getClassString(itemClass, addModifier(itemClass.modifier))

function getCompoundEditorClass(component, device, mode) {
  const classes = component.classes.filter(cls => cls.device === device && cls.mode === mode)
  return classes.map(cls =>  getEditorClass(cls)).join(' ')
}

describe('modifierAdder function', () => {
  describe('common case: add "hover" to "bg-white"', () => {
    const modifiedClass = modifierAdder('hover:')('bg-white')
    it('adds hover', () => {
      expect(modifiedClass).toBe('hover:bg-white')
    })
  })

  describe('no style case: add "hover" to ""', () => {
    const modifiedClass = modifierAdder('hover:')('')
    it('returns empty string', () => {
      expect(modifiedClass).toBe('')
    })
  })

  describe('"default" style case: add "hover" to "default"', () => {
    const modifiedClass = modifierAdder('hover:')('default')
    it('returns empty string', () => {
      expect(modifiedClass).toBe('')
    })
  })
})



import { 
  modifierAdder, 
  modifierComposer, 
  getClassString,
  getEditorClass,
  getItemEditorClass,
  getItemRenderedClass } from '@/lib/generators/ClassGeneration.js'


 const dumbGenerators = [(value, f) => { 
  console.log(value)
    const keys = Object.keys(value).filter(key => value.hasOwnProperty(key)).map(key => key).filter(key => !['mode', 'modifier', 'device'].includes(key))
    const values = keys.map(key => value[key]).map(value => f(value)).join(' ')

    return  values 
  }]

describe('modifierAdder function', () => {
  describe('common case: add "hover" to "bg-white"', () => {
    const modifiedClass = modifierAdder('hover', 'unset')('bg-white')
    it('adds hover', () => {
      expect(modifiedClass).toBe('hover:bg-white')
    })
  })

  describe('no style case: add "hover" to ""', () => {
    const modifiedClass = modifierAdder('hover', 'unset')('')
    it('returns empty string', () => {
      expect(modifiedClass).toBe('')
    })
  })

  describe('"default" style case: add "hover" to "default"', () => {
    const modifiedClass = modifierAdder('hover')('unset')
    it('returns empty string', () => {
      expect(modifiedClass).toBe('')
    })
  })
  
  describe('composing modifiers "dark", "md", "hover" with "test" style', () => {
    const modeClass = modifierComposer('dark', 'md', 'hover')( 'test' )
    it('returns "dark:md:hover:test"', () => {
      expect(modeClass).toBe('dark:md:hover:test')
    })
  })

  describe('composing default modifiers "light", "any", "default" with "test" style should return "test"', () => {
    const modeClass = modifierComposer('light', 'any', 'unset')( 'test' )
    it('returns "dark:md:hover:test"', () => {
      expect(modeClass).toBe('test')
    })
  })
})

describe('modifierComposer function', () => {
  describe('composing modifiers "dark", "md", "hover" with "default" style', () => {
    const modeClass = modifierComposer('dark', 'md', 'hover')( 'unset' )
    it('returns empty string', () => {
      expect(modeClass).toBe('')
    })
  })

  describe('composing modifiers "dark", "md", "hover" with "style" style', () => {
    const modeClass = modifierComposer('dark', 'md', 'hover')( 'style' )
    it('returns dark:md:hover:style', () => {
      expect(modeClass).toBe('dark:md:hover:style')
    })
  })
})

describe('getClassString function', () => {
  describe('generate class for two properties and "hover" modifier ', () => {
    const itemClass = {
      backgroundColor: 'test-blue',
      marginTop: 'unset',
      shadow: 'test-shadow'
    }
    const modeClass = getClassString(itemClass, modifierAdder('hover', 'unset'), dumbGenerators )
    it('returns empty string', () => {
      expect(modeClass).toContain('hover:test-blue')
      expect(modeClass).toContain(' hover:test-shadow')
    })
  })

  describe('generate class for two properties and "" modifier ', () => {
    const itemClass = {
      backgroundColor: 'test-blue',
      marginTop: 'unset',
      shadow: 'test-shadow'
    }
    const modeClass = getClassString(itemClass, modifierAdder('') , dumbGenerators)
    it('returns empty string', () => {
      expect(modeClass).toContain('test-blue')
      expect(modeClass).toContain('test-shadow')
    })
  })
})

describe('getEditorClass function', () => {
  describe('generalCase', () => {
    const itemClass = {
      modifier: 'active',
      backgroundColor: 'test-blue',
      shadow: 'test-shadow',
      marginTop: 'unset',
    }
    const modeClass = getEditorClass(itemClass, dumbGenerators)
    it('returns empty string', () => {
      expect(modeClass).toContain('active:test-blue')
      expect(modeClass).toContain(' active:test-shadow')
    })
  })
})

describe('getItemEditorClass function', () => {
  const component = {
    classes: [
      {
        device: 'md',
        mode: 'dark',
        modifier: 'active',
        backgroundColor: 'bg-md-dark-active',
        marginTop: 'unset',
        shadow: 'sh-md-dark-active'
      }, 
      {
        device: 'md',
        mode: 'dark',
        modifier: 'hover',
        backgroundColor: 'bg-md-dark-hover',
        marginTop: 'unset',
        shadow: 'sh-md-dark-hover'
      },
      {
        device: 'md',
        mode: 'light',
        modifier: 'hover',
        backgroundColor: 'bg-md-hover',
        marginTop: 'unset',
        shadow: 'sh-md-hover'
      },
      {
        device: 'any',
        mode: 'light',
        modifier: 'hover',
        backgroundColor: 'bg-hover',
        marginTop: 'unset',
        shadow: 'sh-hover'
      },
      {
        device: 'any',
        mode: 'light',
        modifier: 'unset',
        backgroundColor: 'bg-none',
        marginTop: 'unset',
        shadow: 'sh-none'
      }
    ]
  } 
  describe('generalCase dark mode', () => {
    const componentClass = getItemEditorClass(component, 'md', 'dark', dumbGenerators)
    it('returns empty string', () => {
      expect(componentClass).toContain('active:bg-md-dark-active')
      expect(componentClass).toContain(' active:sh-md-dark-active')
      expect(componentClass).toContain(' hover:bg-md-dark-hover')
      expect(componentClass).toContain(' hover:sh-md-dark-hover')
      expect(componentClass).not.toContain(' bg-md-hover')
      expect(componentClass).not.toContain(' sh-md-hover')
      expect(componentClass).not.toContain(' bg-hover')
      expect(componentClass).not.toContain(' sh-hover')
      expect(componentClass).not.toContain(' bg-none')
      expect(componentClass).not.toContain(' sh-none')
    })
  })

  describe('generalCase light mode', () => {
    
    const componentClass = getItemEditorClass(component, 'md', 'light', dumbGenerators)
    it('returns empty string', () => {
      expect(componentClass).not.toContain(' dark:md:active:bg-md-dark-active')
      expect(componentClass).not.toContain(' dark:md:active:sh-md-dark-active')
      expect(componentClass).not.toContain(' dark:md:hover:bg-md-dark-hover')
      expect(componentClass).not.toContain(' dark:md:hover:sh-md-dark-hover')
      expect(componentClass).toContain('hover:bg-md-hover')
      expect(componentClass).toContain(' hover:sh-md-hover')
      expect(componentClass).not.toContain(' bg-hover')
      expect(componentClass).not.toContain(' sh-hover')
      expect(componentClass).not.toContain(' bg-none')
      expect(componentClass).not.toContain(' sh-none')
    })
  })

  describe('generalCase no mode any device', () => {
    
    const componentClass = getItemEditorClass(component, 'any', 'light', dumbGenerators)
    it('returns empty string', () => {
      expect(componentClass).not.toContain(' active:bg-md-dark-active')
      expect(componentClass).not.toContain(' active:sh-md-dark-active')
      expect(componentClass).not.toContain(' hover:bg-md-dark-hover')
      expect(componentClass).not.toContain(' hover:sh-md-dark-hover')
      expect(componentClass).not.toContain(' bg-md-hover')
      expect(componentClass).not.toContain(' sh-md-hover')
      expect(componentClass).toContain('hover:bg-hover')
      expect(componentClass).toContain(' hover:sh-hover')
      expect(componentClass).toContain(' bg-none')
      expect(componentClass).toContain(' sh-none')
    })
  })
})

describe('getItemRenderedClass function', () => {
  const component = {
    classes: [
      {
        device: 'md',
        mode: 'dark',
        modifier: 'active',
        backgroundColor: 'bg-md-dark-active',
        marginTop: 'unset',
        shadow: 'sh-md-dark-active'
      }, 
      {
        device: 'md',
        mode: 'dark',
        modifier: 'unset',
        marginTop: 'unset',
        backgroundColor: 'bg-md-dark',
        shadow: 'sh-md-dark'
      },
      {
        device: 'md',
        mode: 'light',
        modifier: 'hover',
        marginTop: 'unset',
        backgroundColor: 'bg-md-hover',
        shadow: 'sh-md-hover'
      },
      {
        device: 'md',
        mode: 'light',
        modifier: 'unset',
        marginTop: 'unset',
        backgroundColor: 'bg-md',
        shadow: 'sh-md'
      },
      {
        device: 'any',
        mode: 'light',
        modifier: 'hover',
        marginTop: 'unset',
        backgroundColor: 'bg-hover',
        shadow: 'sh-hover'
      },
      {
        device: 'any',
        mode: 'dark',
        modifier: 'unset',
        backgroundColor: 'bg-dark',
        marginTop: 'unset',
        shadow: 'sh-dark'
      },
      {
        device: 'any',
        mode: 'light',
        modifier: 'unset',
        marginTop: 'unset',
        backgroundColor: 'bg-none',
        shadow: 'sh-none'
      }
    ]
  } 
  describe('generalCase mode', () => {
    
    const componentClass = getItemRenderedClass(component, dumbGenerators)
    it('returns empty string', () => {
      expect(componentClass).toContain('dark:md:active:bg-md-dark-active ')
      expect(componentClass).toContain(' dark:md:active:sh-md-dark-active ')
      expect(componentClass).toContain(' dark:md:bg-md-dark ')
      expect(componentClass).toContain(' dark:md:sh-md-dark ')
      expect(componentClass).toContain(' md:bg-md ')
      expect(componentClass).toContain(' md:sh-md ')
      expect(componentClass).toContain(' dark:bg-dark ')
      expect(componentClass).toContain(' dark:sh-dark')
      expect(componentClass).toContain(' bg-none')
      expect(componentClass).toContain(' sh-none')
    })
  })
})




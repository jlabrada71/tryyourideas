
import { 
  modifierAdder, 
  modifierComposer, 
  getClassString,
  getEditorClass,
  getComponentEditorClass,
  getComponentRenderedClass } from '../lib/ClassGeneration'

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
  
  describe('composing modifiers "dark", "md", "hover" with "test" style', () => {
    const modeClass = modifierComposer('dark:', 'md:', 'hover:')( 'test' )
    it('returns "dark:md:hover:test"', () => {
      expect(modeClass).toBe('dark:md:hover:test')
    })
  })
})

describe('modifierComposer function', () => {
  describe('composing modifiers "dark", "md", "hover" with "default" style', () => {
    const modeClass = modifierComposer('dark:', 'md:', 'hover:')( 'default' )
    it('returns empty string', () => {
      expect(modeClass).toBe('')
    })
  })

  describe('composing modifiers "dark", "md", "hover" with "style" style', () => {
    const modeClass = modifierComposer('dark:', 'md:', 'hover:')( 'style' )
    it('returns dark:md:hover:style', () => {
      expect(modeClass).toBe('dark:md:hover:style')
    })
  })
})

describe('getClassString function', () => {
  describe('generate class for two properties and "hover" modifier ', () => {
    const itemClass = {
      backgroundColor: 'test-blue',
      shadow: 'test-shadow'
    }
    const modeClass = getClassString(itemClass, modifierAdder('hover:') )
    it('returns empty string', () => {
      expect(modeClass).toContain(' hover:test-blue')
      expect(modeClass).toContain(' hover:test-shadow')
    })
  })

  describe('generate class for two properties and "" modifier ', () => {
    const itemClass = {
      backgroundColor: 'test-blue',
      shadow: 'test-shadow'
    }
    const modeClass = getClassString(itemClass, modifierAdder('') )
    it('returns empty string', () => {
      expect(modeClass).toContain('test-blue')
      expect(modeClass).toContain('test-shadow')
    })
  })
})

describe('getEditorClass function', () => {
  describe('generalCase', () => {
    const itemClass = {
      modifier: 'active:',
      backgroundColor: 'test-blue',
      shadow: 'test-shadow'
    }
    const modeClass = getEditorClass(itemClass)
    it('returns empty string', () => {
      expect(modeClass).toContain(' active:test-blue')
      expect(modeClass).toContain(' active:test-shadow')
    })
  })
})

describe('getComponentEditorClass function', () => {
  const component = {
    classes: [
      {
        device: 'md:',
        mode: 'dark:',
        modifier: 'active:',
        backgroundColor: 'bg-md-dark-active',
        shadow: 'sh-md-dark-active'
      }, 
      {
        device: 'md:',
        mode: 'dark:',
        modifier: 'hover:',
        backgroundColor: 'bg-md-dark-hover',
        shadow: 'sh-md-dark-hover'
      },
      {
        device: 'md:',
        mode: '',
        modifier: 'hover:',
        backgroundColor: 'bg-md-hover',
        shadow: 'sh-md-hover'
      },
      {
        device: '',
        mode: '',
        modifier: 'hover:',
        backgroundColor: 'bg-hover',
        shadow: 'sh-hover'
      },
      {
        device: '',
        mode: '',
        modifier: '',
        backgroundColor: 'bg-none',
        shadow: 'sh-none'
      }
    ]
  } 
  describe('generalCase dark mode', () => {
    
    const componentClass = getComponentEditorClass(component, 'md:', 'dark:')
    it('returns empty string', () => {
      expect(componentClass).toContain(' active:bg-md-dark-active')
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
    
    const componentClass = getComponentEditorClass(component, 'md:', '')
    it('returns empty string', () => {
      expect(componentClass).not.toContain(' active:bg-md-dark-active')
      expect(componentClass).not.toContain(' active:sh-md-dark-active')
      expect(componentClass).not.toContain(' hover:bg-md-dark-hover')
      expect(componentClass).not.toContain(' hover:sh-md-dark-hover')
      expect(componentClass).toContain(' bg-md-hover')
      expect(componentClass).toContain(' sh-md-hover')
      expect(componentClass).not.toContain(' bg-hover')
      expect(componentClass).not.toContain(' sh-hover')
      expect(componentClass).not.toContain(' bg-none')
      expect(componentClass).not.toContain(' sh-none')
    })
  })

  describe('generalCase no mode any device', () => {
    
    const componentClass = getComponentEditorClass(component, '', '')
    it('returns empty string', () => {
      expect(componentClass).not.toContain(' active:bg-md-dark-active')
      expect(componentClass).not.toContain(' active:sh-md-dark-active')
      expect(componentClass).not.toContain(' hover:bg-md-dark-hover')
      expect(componentClass).not.toContain(' hover:sh-md-dark-hover')
      expect(componentClass).not.toContain(' bg-md-hover')
      expect(componentClass).not.toContain(' sh-md-hover')
      expect(componentClass).toContain(' bg-hover')
      expect(componentClass).toContain(' sh-hover')
      expect(componentClass).toContain(' bg-none')
      expect(componentClass).toContain(' sh-none')
    })
  })
})

describe('getComponentRenderedClass function', () => {
  const component = {
    classes: [
      {
        device: 'md:',
        mode: 'dark:',
        modifier: 'active:',
        backgroundColor: 'bg-md-dark-active',
        shadow: 'sh-md-dark-active'
      }, 
      {
        device: 'md:',
        mode: 'dark:',
        modifier: 'hover:',
        backgroundColor: 'bg-md-dark-hover',
        shadow: 'sh-md-dark-hover'
      },
      {
        device: 'md:',
        mode: '',
        modifier: 'hover:',
        backgroundColor: 'bg-md-hover',
        shadow: 'sh-md-hover'
      },
      {
        device: '',
        mode: '',
        modifier: 'hover:',
        backgroundColor: 'bg-hover',
        shadow: 'sh-hover'
      },
      {
        device: '',
        mode: '',
        modifier: '',
        backgroundColor: 'bg-none',
        shadow: 'sh-none'
      }
    ]
  } 
  describe('generalCase dark mode', () => {
    
    const componentClass = getComponentRenderedClass(component, 'md:', 'dark:')
    it('returns empty string', () => {
      expect(componentClass).toContain(' dark:md:active:bg-md-dark-active')
      expect(componentClass).toContain(' dark:md:active:sh-md-dark-active')
      expect(componentClass).toContain(' dark:md:hover:bg-md-dark-hover')
      expect(componentClass).toContain(' dark:md:hover:sh-md-dark-hover')
      expect(componentClass).not.toContain(' bg-md-hover')
      expect(componentClass).not.toContain(' sh-md-hover')
      expect(componentClass).not.toContain(' bg-hover')
      expect(componentClass).not.toContain(' sh-hover')
      expect(componentClass).not.toContain(' bg-none')
      expect(componentClass).not.toContain(' sh-none')
    })
  })

  describe('generalCase light mode', () => {
    
    const componentClass = getComponentRenderedClass(component, 'md:', '')
    it('returns empty string', () => {
      expect(componentClass).not.toContain('active:bg-md-dark-active')
      expect(componentClass).not.toContain('active:sh-md-dark-active')
      expect(componentClass).not.toContain('hover:bg-md-dark-hover')
      expect(componentClass).not.toContain('hover:sh-md-dark-hover')
      expect(componentClass).toContain('md:hover:bg-md-hover')
      expect(componentClass).toContain('md:hover:sh-md-hover')
      expect(componentClass).not.toContain('bg-hover')
      expect(componentClass).not.toContain('sh-hover')
      expect(componentClass).not.toContain('bg-none')
      expect(componentClass).not.toContain('sh-none')
    })
  })

  describe('generalCase no mode any device', () => {
    
    const componentClass = getComponentRenderedClass(component, '', '')
    it('returns empty string', () => {
      expect(componentClass).not.toContain('active:bg-md-dark-active')
      expect(componentClass).not.toContain('active:sh-md-dark-active')
      expect(componentClass).not.toContain('hover:bg-md-dark-hover')
      expect(componentClass).not.toContain('hover:sh-md-dark-hover')
      expect(componentClass).not.toContain('bg-md-hover')
      expect(componentClass).not.toContain('sh-md-hover')
      expect(componentClass).toContain('bg-hover')
      expect(componentClass).toContain('sh-hover')
      expect(componentClass).toContain('bg-none')
      expect(componentClass).toContain('sh-none')
    })
  })
})




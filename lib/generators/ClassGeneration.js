
import { plugins } from '@/lib/plugins/registry.js'

const importedPlugins = plugins

export function modifierAdder(modifier, defaultModifier) {
  return style => {
    if (!style) return ''
    if (style === 'unset') return ''
    if (modifier === defaultModifier) return style
    return `${modifier}:${style}`
  }
}

export function modifierComposer(mode, device, modifier) {
  return style => {
    const modifierStyle = modifierAdder(modifier, 'unset')(style)
    const deviceStyle = modifierAdder(device, 'any')(modifierStyle)
    return modifierAdder(mode, 'light')( deviceStyle )
  }
}

export function getClassString( itemClass, f, plugins ) {

  const code = plugins.map( plugin => plugin.generator(itemClass, f )).join(' ')

  return code
}

export function getEditorClass(itemClass, plugins) {
  return getClassString(itemClass, modifierAdder(itemClass.modifier, 'unset'), plugins)
}

export function getRenderedClass(itemClass, plugins) {
  return getClassString(itemClass, modifierComposer(itemClass.mode, itemClass.device, itemClass.modifier), plugins)
}

export function getItemEditorClass(item, device, mode, plugins = importedPlugins ) {
  // console.log('component classes: ' + component.classes.length )
  // console.log(`device:${device} mode:${mode}`)
  const classes = item.classes.filter(cls => cls.device === device && cls.mode === mode)
  // console.log('editor classes: ' + classes.length )
  // console.log()
  return classes.map(cls =>  getEditorClass(cls, plugins)).join(' ')
}

export function optimizeClasses(classes) {
  const resultClasses = classes.map(cls => cls)

  return resultClasses
}

export function getItemRenderedClass(item, plugins = importedPlugins) {
  const optimized = optimizeClasses(item.classes)
  return optimized.map(cls =>  getRenderedClass(cls, plugins)).join(' ')
}
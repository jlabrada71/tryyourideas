export function modifierAdder(modifier) {
  return style => {
    if (!style) return ''
    if (style === 'default') return ''
    if (modifier === '') return style
    return `${modifier}:${style}`
  }
}

export function modifierComposer(mode, device, modifier) {
  return style => {
    const modifierStyle = modifierAdder(modifier)(style)
    const deviceStyle = modifierAdder(device)(modifierStyle)
    return modifierAdder(mode)( deviceStyle )
  }
}

export function getClassString( itemClass, f ) {
  return ` ${f(itemClass.backgroundColor)} ${f(itemClass.width)} ${f(itemClass.height)} ${f(itemClass.padding)} ${f(itemClass.margin)}  ${f(itemClass.spacing)}
           ${f(itemClass.shadow)} ${f(itemClass.shadowColor)} 
           ${f(itemClass.borderRadius)} ${f(itemClass.borderWidth)} ${f(itemClass.borderStyle)} ${f(itemClass.borderColor)}
           ${f(itemClass.textColor)} ${f(itemClass.fontSize)}  ${f(itemClass.fontWeight)} ${f(itemClass.fontFamily)} ${f(itemClass.letterSpacing)} ${f(itemClass.lineHeight)}  ${f(itemClass.textAlign)} ${f(itemClass.textVerticalAlign)}
           ${f(itemClass.outlineColor)} 
           ${f(itemClass.ringColor)} 
           ${f(itemClass.divideColor)} 
           flex flex-wrap
        ` 
}

export function getEditorClass(itemClass) {
  return getClassString(itemClass, modifierAdder(itemClass.modifier))
}

export function getRenderedClass(itemClass) {
  return getClassString(itemClass, modifierComposer(itemClass.mode, itemClass.device, itemClass.modifier))
}

export function getComponentEditorClass(component, device, mode) {
  // console.log('component classes: ' + component.classes.length )
  // console.log(`device:${device} mode:${mode}`)
  const classes = component.classes.filter(cls => cls.device === device && cls.mode === mode)
  // console.log('editor classes: ' + classes.length )
  // console.log()
  return classes.map(cls =>  getEditorClass(cls)).join(' ')
}

export function getComponentRenderedClass(component) {
  return component.classes.map(cls =>  getRenderedClass(cls)).join(' ')
}
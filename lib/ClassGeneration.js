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

function generateMargin(itemClass, f) {
  if (itemClass.marginTop.startsWith('m-')) {
    return f(itemClass.marginTop)
  }

  if (itemClass.marginTop.startsWith('my-')) {
    return `${f(itemClass.marginTop)} ${f(itemClass.marginLeft)}`
  }

  return `${f(itemClass.marginTop)}  ${f(itemClass.marginLeft)} ${f(itemClass.marginRight)} ${f(itemClass.marginBottom)}`
}

function generatePadding(itemClass, f) {
  if (itemClass.paddingTop.startsWith('p-')) {
    return f(itemClass.paddingTop)
  }

  if (itemClass.paddingTop.startsWith('py-')) {
    return `${f(itemClass.paddingTop)} ${f(itemClass.paddingLeft)}`
  }

  return `${f(itemClass.paddingTop)}  ${f(itemClass.paddingLeft)} ${f(itemClass.paddingRight)} ${f(itemClass.paddingBottom)}`
}

export function getClassString( itemClass, f ) {
  const margin = generateMargin(itemClass, f)
  const padding = generatePadding(itemClass, f)
  return ` ${f(itemClass.display)}
           ${f(itemClass.flexBasis)} ${f(itemClass.flexDirection)} ${f(itemClass.flexWrap)} ${f(itemClass.flexShrinkGrow)}
           ${f(itemClass.gap)}  
           ${f(itemClass.justifyContent)}  ${f(itemClass.justifyItems)}  ${f(itemClass.justifySelf)} 
           ${f(itemClass.alignContent)}  ${f(itemClass.alignItems)}  ${f(itemClass.alignSelf)} 
           ${f(itemClass.placeContent)}  ${f(itemClass.placeItems)}  ${f(itemClass.placeSelf)} 
           ${margin} 
           ${padding}
           ${f(itemClass.backgroundColor)} ${f(itemClass.width)} ${f(itemClass.height)} ${f(itemClass.spacing)}
           ${f(itemClass.shadow)} ${f(itemClass.shadowColor)} 
           ${f(itemClass.borderRadius)} ${f(itemClass.borderWidth)} ${f(itemClass.borderStyle)} ${f(itemClass.borderColor)}
           ${f(itemClass.textColor)} ${f(itemClass.fontSize)}  ${f(itemClass.fontWeight)} ${f(itemClass.fontFamily)} ${f(itemClass.letterSpacing)} ${f(itemClass.lineHeight)}  ${f(itemClass.textAlign)} ${f(itemClass.textVerticalAlign)}
           ${f(itemClass.outlineColor)} 
           ${f(itemClass.ringColor)} 
           ${f(itemClass.divideColor)} 
           ${f(itemClass.fillColor)}
           ${f(itemClass.transition)} ${f(itemClass.transitionDuration)} ${f(itemClass.transitionTiming)} ${f(itemClass.transitionDelay)}
           ${f(itemClass.animate)}
           ${f(itemClass.transformScale )} ${f(itemClass.transformRotate )} ${f(itemClass.transformTranslate )} ${f(itemClass.transformSkew )} ${f(itemClass.transformOrigin )}
           ${f(itemClass.gradientDirection )} ${f(itemClass.gradientFromColor )} ${f(itemClass.gradientViaColor )} ${f(itemClass.gradientToColor )}  
           ` 
}

export function getEditorClass(itemClass) {
  return getClassString(itemClass, modifierAdder(itemClass.modifier, 'unset'))
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

export function optimizeClasses(classes) {
  const resultClasses = classes.map(cls => cls)

  return resultClasses
}

export function getComponentRenderedClass(component) {
  const optimized = optimizeClasses(component.classes)
  return optimized.map(cls =>  getRenderedClass(cls)).join(' ')
}
import { generateMain } from '@/lib/plugins/main.js'
import { generateSpacing } from '@/lib/plugins/spacing.js'
import { generateMargin } from '@/lib/plugins/margin.js'
import { generateAlign } from '@/lib/plugins/align.js'
import { generatePadding } from '@/lib/plugins/padding.js'
import { generateFlex } from '@/lib/plugins/flex.js'
import { generatePlace } from '@/lib/plugins/place.js'
import { generateJustify } from '@/lib/plugins/justify.js'
import { generateTypography } from '@/lib/plugins/typography.js'
import { generateTransform } from '@/lib/plugins/transform.js'
import { generateTransition } from '@/lib/plugins/transition.js'
import { generateGradient } from '@/lib/plugins/gradient.js'
import { generateShadow } from '@/lib/plugins/shadow.js'
import { generateBorder } from '@/lib/plugins/border.js'
import { generateOtherColors } from '@/lib/plugins/other-colors.js'
import { generateOther } from '@/lib/plugins/other.js'
import { generateOutlineRing } from '~/lib/plugins/outline-ring.js'

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

export function getClassString( itemClass, f, codeGenerators ) {

  const code = codeGenerators.map( generator => generator(itemClass, f )).join(' ')

  return code
}

const codeGenerators = [
  generateMain,
  generateMargin, 
  generatePadding, 
  generateSpacing,
  generateAlign,
  generateBorder,
  generateFlex,
  generateJustify,
  generatePlace,
  generateTypography,
  generateTransform,
  generateTransition,
  generateGradient,
  generateShadow,
  generateOutlineRing,
  generateOtherColors,
  generateOther
]

export function getEditorClass(itemClass) {
  return getClassString(itemClass, modifierAdder(itemClass.modifier, 'unset'), codeGenerators)
}

export function getRenderedClass(itemClass) {
  return getClassString(itemClass, modifierComposer(itemClass.mode, itemClass.device, itemClass.modifier), codeGenerators)
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
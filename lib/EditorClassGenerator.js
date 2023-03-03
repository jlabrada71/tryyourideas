export function modifierAdder(modifier) {
  return style => {
    if (!style) return ''
    if (style === 'default') return ''
    return `${modifier}${style}`
  }
}
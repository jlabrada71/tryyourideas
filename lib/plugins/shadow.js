export function generateShadow(itemClass, f) {
  return `
  ${f(itemClass.shadow)} 
  ${f(itemClass.shadowColor)} `
}

export function getShadowVariables() {
  return {
    shadow: 'unset',
    shadowColor: 'unset',
  }
}
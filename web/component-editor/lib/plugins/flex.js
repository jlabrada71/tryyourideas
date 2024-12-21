export function generateFlex(itemClass, f) {
  return `
   ${f(itemClass.gap)}
   ${f(itemClass.flexBasis)}
   ${f(itemClass.flexDirection)}
   ${f(itemClass.flexWrap)} 
   ${f(itemClass.flexShrinkGrow)}`
}

export function getFlexVariables() {
  return {
    gap: 'unset',
    flexBasis: 'unset',
    flexDirection: 'unset',
    flexWrap: 'unset',
    flexShrinkGrow: 'unset',
  }
}

export const flexPlugin = { 
  generator: generateFlex, 
  getVariables: getFlexVariables 
} 
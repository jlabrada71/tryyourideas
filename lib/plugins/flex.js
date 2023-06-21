export function generateFlex(itemClass, f) {
  return `${f(itemClass.flexBasis)}
   ${f(itemClass.flexDirection)}
   ${f(itemClass.flexWrap)} 
   ${f(itemClass.flexShrinkGrow)}`
}

export function getFlexVariables() {
  return {
    flexBasis: 'unset',
    flexDirection: 'unset',
    flexWrap: 'unset',
    flexShrinkGrow: 'unset',
  }
}
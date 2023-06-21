export function generateGradient(itemClass, f) {
  return `${f(itemClass.gradientDirection )} 
  ${f(itemClass.gradientFromColor )} 
  ${f(itemClass.gradientViaColor )} 
  ${f(itemClass.gradientToColor )}`
}

export function getGradientVariables() {
  return {
    gradientDirection: 'unset',
    gradientFromColor: 'unset',
    gradientViaColor: 'unset',
    gradientToColor: 'unset',
  }
}
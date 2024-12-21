export function generateOtherColors(itemClass, f) {
  return ` ${f(itemClass.accentColor)}
  ${f(itemClass.fillColor)}`
}

export function getOtherColorsVariables() {
  return {
    accentColor: 'unset',
    fillColor: 'unset',
  }
}

export const otherColorsPlugin = { 
  generator: generateOtherColors, 
  getVariables: getOtherColorsVariables 
} 
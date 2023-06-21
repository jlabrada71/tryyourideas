export function generateOtherColors(itemClass, f) {
  return `  ${f(itemClass.divideColor)} 
  ${f(itemClass.accentColor)}
  ${f(itemClass.fillColor)}`
}
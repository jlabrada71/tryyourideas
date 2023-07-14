export function generateOtherColors(itemClass, f) {
  return ` ${f(itemClass.accentColor)}
  ${f(itemClass.fillColor)}`
}
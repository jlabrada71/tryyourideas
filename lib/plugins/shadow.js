export function generateShadow(itemClass, f) {
  return `${f(itemClass.shadow)} ${f(itemClass.shadowColor)} `
}
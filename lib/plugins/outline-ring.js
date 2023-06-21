export function generateOutlineRing(itemClass, f) {
  return `${f(itemClass.outlineColor)} ${f(itemClass.ringColor)} `
}
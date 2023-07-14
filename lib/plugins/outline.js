export function generateOutline(itemClass, f) {
  return `${f(itemClass.outlineColor)} ${f(itemClass.outlineWidth)} ${f(itemClass.outlineStyle)}  ${f(itemClass.outlineOffset)}  `
}

export function getOutlineVariables() {
  return {
    outlineColor: 'unset',
    outlineWidth: 'unset',
    outlineStyle: 'unset',
    outlineOffset: 'unset'
  }
}
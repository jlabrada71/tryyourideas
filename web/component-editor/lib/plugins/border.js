export function generateBorder(itemClass, f) {
  return `${f(itemClass.borderRadius)} 
  ${f(itemClass.borderWidth)} 
  ${f(itemClass.borderStyle)} 
  ${f(itemClass.borderColor)}`
}

export function getBorderVariables() {
  return {
    borderColor: 'unset',
    borderStyle: 'unset',
    borderWidth: 'unset',
    borderRadius: 'unset',
  }
}

export const bordersPlugin = {
  generator: generateBorder,
  getVariables: getBorderVariables
}
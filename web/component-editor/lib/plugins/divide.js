export function generateDivide(itemClass, f) {
  return `${f(itemClass.divideColor)} `
}

export function getDivideVariables() {
  return {
    divideColor: 'unset',
  }
}

export const dividePlugin = {
  generator: generateDivide,
  getVariables: getDivideVariables
}
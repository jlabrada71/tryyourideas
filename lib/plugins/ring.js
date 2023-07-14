
export function generateRing(itemClass, f) {
  return `${f(itemClass.ringColor)} ${f(itemClass.ringWidth)} ${f(itemClass.ringOffset)}  `
}

export function getRingVariables() {
  return {
    ringColor: 'unset',
    ringWidth: 'unset',
    ringOffset: 'unset'
  }
}
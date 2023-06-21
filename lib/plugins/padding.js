export function generatePadding(itemClass, f) {
  if (itemClass.paddingTop.startsWith('p-')) {
    return f(itemClass.paddingTop)
  }

  if (itemClass.paddingTop.startsWith('py-')) {
    return `${f(itemClass.paddingTop)} ${f(itemClass.paddingLeft)}`
  }

  return `${f(itemClass.paddingTop)}  ${f(itemClass.paddingLeft)} ${f(itemClass.paddingRight)} ${f(itemClass.paddingBottom)}`
}

export function getPaddingVariables() {
  return {
    paddingTop: 'unset',
    paddingLeft: 'unset',
    paddingRight: 'unset',
    paddingBottom: 'unset',
  }
}
export function generateMargin(itemClass, f) {
  if (itemClass.marginTop.startsWith('m-')) {
    return f(itemClass.marginTop)
  }

  if (itemClass.marginTop.startsWith('my-')) {
    return `${f(itemClass.marginTop)} ${f(itemClass.marginLeft)}`
  }

  return `${f(itemClass.marginTop)}  ${f(itemClass.marginLeft)} ${f(itemClass.marginRight)} ${f(itemClass.marginBottom)}`
}

export function getMarginVariables() {
  return {
    marginTop: 'unset',
    marginLeft: 'unset',
    marginRight: 'unset',
    marginBottom: 'unset',
  }
}

export const marginPlugin = { 
  generator: generateMargin, 
  getVariables: getMarginVariables 
} 
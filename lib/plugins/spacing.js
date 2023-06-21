export function getSpacingVariables () {
  return {
    spacingX: 'unset',
    spacingY: 'unset',
  }
}

export function generateSpacing(itemClass, f) {
  return `${f(itemClass.spacingX)} ${f(itemClass.spacingY)}`
}
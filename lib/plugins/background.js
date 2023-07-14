export function generateBackground(itemClass, f) {
  return ` ${f(itemClass.backgroundClip )}`
}

export function getBackgroundVariables() {
  return {
    backgroundClip: 'unset',
  }
}
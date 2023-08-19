export function generateBackground(itemClass, f) {
  return ` ${f(itemClass.backgroundClip )}`
}

export function getBackgroundVariables() {
  return {
    backgroundClip: 'unset',
  }
}

export const backgroundPlugin = {
  generator: generateBackground, 
  getVariables: getBackgroundVariables
}
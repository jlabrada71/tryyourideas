export function generateEffects(itemClass, f) {
  return `
  ${f(itemClass.shadow)} 
  ${f(itemClass.shadowColor)}
  ${f(itemClass.opacity)} `
}

export function getEffectsVariables() {
  return {
    shadow: 'unset',
    shadowColor: 'unset',
    opacity: 'unset'
  }
}

export const effectsPlugin = { 
  generator: generateEffects, 
  getVariables: getEffectsVariables 
} 
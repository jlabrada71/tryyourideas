export function generateMain(itemClass, f) {
  return `${f(itemClass.backgroundColor)} 
  ${f(itemClass.width)} 
  ${f(itemClass.height)}`
}

export function getMainVariables() {
  return {
    backgroundColor: 'unset',
    width: 'unset',
    height: 'unset',
  }
}

export const mainPlugin = { 
  generator: generateMain, 
  getVariables: getMainVariables 
} 
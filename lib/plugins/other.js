export function generateOther(itemClass, f) {
  return `${f(itemClass.display)}
  ${f(itemClass.gap)}  
  ${f(itemClass.animate)} `
}

export function getOtherVariables() {
  return {
    display: 'unset',
    gap: 'unset',
    animate: 'unset',
  }
}

export const otherPlugin = { 
  generator: generateOther, 
  getVariables: getOtherVariables 
} 
export function generateJustify(itemClass, f) {
  return `
  ${f(itemClass.justifyContent)}  
  ${f(itemClass.justifyItems)}  
  ${f(itemClass.justifySelf)} `
}

export function getJustifyVariables() {
  return {
    justifyContent: 'unset',
    justifyItems: 'unset',
    justifySelf: 'unset',
  }
}
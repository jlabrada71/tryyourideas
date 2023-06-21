export function generateAlign(itemClass, f) {
  return `${f(itemClass.alignContent)}  
  ${f(itemClass.alignItems)}  
  ${f(itemClass.alignSelf)} `
}
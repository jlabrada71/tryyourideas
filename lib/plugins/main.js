export function generateMain(itemClass, f) {
  return `${f(itemClass.backgroundColor)} 
  ${f(itemClass.width)} 
  ${f(itemClass.height)}`
}
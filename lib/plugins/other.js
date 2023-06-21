export function generateOther(itemClass, f) {
  return `${f(itemClass.display)}
  ${f(itemClass.gap)}  
  ${f(itemClass.animate)} `
}
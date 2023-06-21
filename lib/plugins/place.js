export function generatePlace(itemClass, f) {
  return `${f(itemClass.placeContent)}  
  ${f(itemClass.placeItems)} 
   ${f(itemClass.placeSelf)} `
}
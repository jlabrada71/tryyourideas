export function generatePlace(itemClass, f) {
  return `${f(itemClass.placeContent)}  
  ${f(itemClass.placeItems)} 
   ${f(itemClass.placeSelf)} `
}

export function getPlaceVariables() {
  return {
    placeContent: 'unset',
    placeItems: 'unset',
    placeSelf: 'unset',
  }
}
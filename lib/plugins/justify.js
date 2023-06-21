export function generateJustify(itemClass, f) {
  return `${f(itemClass.justifyContent)}  ${f(itemClass.justifyItems)}  ${f(itemClass.justifySelf)} `
}
/**
 * removes all duplicated appearance of any string in ca from str
 * example: removeDouble( str, [' ', '\n']) removes all duplicates spaces and double enters.
 * @param {*} str : string to remove from
 * @param {*} ca : array of candidate duplicates to remove
 * @returns str with all duplicated removed
 */
export function removeDouble(str, ca) {
  ca.forEach(c => {
    const doubleC = `${c}${c}`
    while (str.indexOf(doubleC) >= 0) 
      str = str.split(doubleC).join(c)
  })
  return str
}

/**
 * Simplifies str by removing duplicates spaces and new lines
 * @param {*} str 
 * @returns str 
 */
export function simplifyLine(str) {
  str = str.split('\n').join(' ')
  return removeDouble(str,[' '])
}
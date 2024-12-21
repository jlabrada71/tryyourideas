export function printTree(item) {
  console.log('==================================')
  console.log(item.id)
  const printClass = cls => console.log(`${cls.mode}:${cls.device}:${cls.modifier}:${cls.backgroundColor}`)
  printClass(item.currentClass) 
  item.classes.forEach(cls => {
    printClass(cls)
  })
  item.children.forEach(child => printTree(child))
}
export function findClassBy(item, { device, mode, modifier }) {
  // console.log('looking for')
  // item.classes.forEach(cls => console.log(`${cls.device} ${device}`))
  return item.classes.find((cls) => cls.device === device && cls.mode === mode && cls.modifier === modifier)
}

export function findOrCreateClassBy(item, device, mode, modifier) {
  const result = findClassBy(item, { device, mode, modifier})
  if (result) return result;
  const resultClass = clone(item.currentClass)
  resultClass.mode = mode
  resultClass.device = device
  resultClass.modifier = modifier
  item.classes.push(resultClass)
  return resultClass
}

export function clone(item) {
  return JSON.parse(JSON.stringify(item))
}

export function removeItemFrom(parent, node) {
  parent.children.forEach((parentNode, i) => {
    if (parentNode.id === node.id) {
      parent.children.splice(i, 1)
      return
    }
    if (node.id.startsWith(parentNode.id)) {
      removeItemFrom(parentNode, node)
    }
  }) 
}

export function copy(cls1, cls2) {
  for(const key in cls1) {
    cls2[key] = cls1[key]
  }
}

export function getItemById(node, id) {
  if (node.id === id) return node
  const candidate = node.children.find(child => id.startsWith(child.id))
  return getItemById(candidate, id)
}
function childrenCode(list) {
  const result = list.map(item => itemToHtml(item)).join('')
  return result
}

function compoundClass(component) {
  // const result = component.classes.map(cls => cls.renderedClass).join(' ')
  const result = component.renderedClass
  return result;
}

function itemToHtml(item) {
  if (!item.type) return ''
  const result = `<${item.type} id="id-${item.id}" class="${compoundClass(item)}">
     ${item.text}
     ${childrenCode(item.children)}
     </${item.type}>
  `
  return result
}

export function toHtml(component) {
  return itemToHtml(component.root)
}

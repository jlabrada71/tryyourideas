import { selfClosingTags } from './typeList'

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
  const code = `<${item.type} id="id-${item.id}" class="${compoundClass(item)}">`
  if (selfClosingTags.includes(item.type)) return code
  return `${code}
     ${item.text}
     ${childrenCode(item.children)}
     </${item.type}>
  `
}

export function toHtml(component) {
  return itemToHtml(component.root)
}

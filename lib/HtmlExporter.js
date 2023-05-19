import { selfClosingTags } from './typeList'
import { generateProperties } from './PropertyUtils'

function childrenCode(list) {
  const result = list.map(item => itemToHtml(item)).join('')
  return result
}

function compoundClass(component) {
  // const result = component.classes.map(cls => cls.renderedClass).join(' ')
  const result = component.renderedClass
  return result;
}

function generateSvg(item) {
  const code = item.props.find( prop => prop.name === 'svg').value
  const finalCode = code.replace('" ',`" id="id-${item.id}"  class="${compoundClass(item)}" ` )
  return finalCode
}

export function itemToHtml(item) {
  if (!item.type) return ''
  if (item.type === 'Icon') return generateSvg(item)
  const code = `<${item.type} id="id-${item.id}" 
                  ${generateProperties(item.props)}
                  class="${compoundClass(item)}">`
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

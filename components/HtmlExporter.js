function childrenCode(list) {
  const result = list.map(item => toHtml(item)).join('')
  return result
}
export default function toHtml(component) {
  const result = `<${component.type} id="id-${component.id}" class="${component.renderedClass}">
     ${component.text}
     ${childrenCode(component.children)}
     </${component.type}>
  `
  return result
}
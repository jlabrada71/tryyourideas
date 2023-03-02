function childrenCode(list) {
  const result = list.map(item => toHtml(item)).join('')
  return result
}

function compoundClass(component) {
  // const result = component.classes.map(cls => cls.renderedClass).join(' ')
  const result = component.renderedClass
  return result;
}

export default function toHtml(component) {
  const result = `<${component.type} id="id-${component.id}" class="${compoundClass(component)}">
     ${component.text}
     ${childrenCode(component.children)}
     </${component.type}>
  `
  return result
}
import { selfClosingTags } from '@/lib/typeList.js'
import { generateProperties } from '@/lib/PropertyUtils.js'
import { getItemRenderedClass } from '@/lib/ClassGeneration.js'

function childrenCode(list) {
  const result = list.map(item => itemToHtml(item)).join('')
  return result
}

function cleanText(text) {
  text = text.split('\n').join(' ')
  while(text.indexOf('  ') > -1) 
    text = text.split('  ').join(' ')
  return text
}

function generateSvg(item) {
  const code = item.props.find( prop => prop.name === 'svg').value
  const finalCode = code.replace('" ',`" id="id-${item.id}"  class="${cleanText(getItemRenderedClass(item))}" ` )
  return finalCode
}

export function itemToHtml(item) {
  if (!item.type) return ''
  if (item.isComponent) {
    return `<${item.type} id="id-${item.id}" ></${item.type}>`
  }
  if (item.type === 'Icon') return generateSvg(item)
  const code = `<${item.type} id="id-${item.id}" 
                  ${generateProperties(item.props)}
                  class="${cleanText(getItemRenderedClass(item))}">`
  if (selfClosingTags.includes(item.type)) return code
  return `${code}
     ${item.text}
     ${childrenCode(item.children)}
     </${item.type}>
  `
}

export function toHtml(component) {
  return `<template>\n${itemToHtml(component.root)}\n</template>`
}

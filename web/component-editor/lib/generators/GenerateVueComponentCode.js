import beautify from 'js-beautify'
import { toHtml } from '@/lib/generators/HtmlExporter.js'

const { js, css, html } = beautify

export function generateVueComponentCode(component) {
  return getCode(component)
}

function getCode(component) {
  const code = beautifyHtml(toHtml(component) ) + 
    '<script setup>\n' +
      beautifyJs(toJavascript(component)) +
    '\n</script>\n' + 
    '<style scoped>\n' +
      beautifyCss(toCss(component)) +
    '\n</style>'
  return code
}

function beautifyHtml(code) {
  return html( code, {
    "end_with_newline": true,
    "js": {
        "indent_size": 2
    },
    "css": {
        "indent_size": 2
    }
  })
}

function beautifyJs(code) {
  return js(code, {
    "preserve-newlines": true
  })
}

function beautifyCss(code) {
  return css(code, {
    "indent_size": 1
  })
}

function toCss(component) {
  return ''
}

function propertyCode(property) {
  return `
    ${property.name}: {
      type: ${property.type},
      required: ${property.isRequired},
      default: ${defaultValue(property)}
    }
  `
}

function defaultValue(prop) {
  if (prop.type === 'String') return `'${prop.defaultValue}'`
  return `${prop.defaultValue}`
}

function variableCode(variable) {
  return `
  const ${variable.name} = ref(${defaultValue(variable)})
`
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function toJavascript(component) {
  const propertiesCode = component.properties.map(property => propertyCode(property)).join(',\n')
  const writeableProperties = component.properties.filter(property => property.access === 'Write')
  const emits = writeableProperties.map( prop => `'update:${prop.name}'`).join(', ')
  const updateFunctions = writeableProperties.map( prop => `
    function update${capitalize(prop.name)} (value) {
      emit('update:${prop.name}', value)
    }
  `).join('\n')
  return `
    const props = defineProps({
      ${propertiesCode}
    })
    const emit = defineEmits([${emits}])
    ${updateFunctions}
  `
}
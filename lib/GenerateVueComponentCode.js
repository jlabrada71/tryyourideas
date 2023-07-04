import beautify from 'js-beautify'
import { toHtml } from '@/lib/HtmlExporter.js'

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

function toJavascript(component) {
  const propertiesCode = component.properties.map(property => propertyCode(property)).join(',\n')
  return `
    const props = defineProps({
      ${propertiesCode}
    })
    const emits = defineEmits(['update:name'])
    const _name = computed({
      get() {
        return props.name
      },
      set(value) {
        emit('update:name', value)
      }
    })
  `
}
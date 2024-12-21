import { removeRelativePath } from '@/lib/url-utils.js'
import { capitalize } from '@/lib/name-utils.js'

function definedValue(prop) {
  
  if ( prop.name === 'src' && prop.method === 'search' ) {
    return `${prop.name}="${removeRelativePath(prop.value)}"`
  }
  return `${prop.name}="${prop.value}"`
}

export function generateProperties(properties, component) {
  const bindedProperties = properties.filter(prop => prop.isBinded)
  const writeableBindedProperties = bindedProperties.filter(prop => prop.bindTo.access === 'Write' )
  const definedValueProps = properties.filter(prop => prop.value && !bindedProperties.includes(prop))
  
  const definedValueString = definedValueProps.map(definedValue).join(' ')
  const bindedPropertiesString = bindedProperties.map( prop => `:${prop.name}="props.${prop.bindTo.name}"`).join(' ')
  const updatePropertyEvents = writeableBindedProperties.map(prop => `@update:${prop.name}="update${capitalize(prop.bindTo.name)}"`).join(' ')
  
  return bindedPropertiesString + ' ' + definedValueString + ' ' + updatePropertyEvents
}

export function setIsBinded(property, value) {
  property.isBinded = value
  property.bindTo = { name: '' }
}

export function bindPropertyTo(property, componentProperty) {
  console.log(JSON.stringify(componentProperty,null,2))
  property.bindTo = { ...componentProperty }
  property.isBinded = true
}
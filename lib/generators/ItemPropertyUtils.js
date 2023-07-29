export function getReplacedUrl(properties, url) {
  return properties.reduce((p, c) => p.replaceAll(`{${c.name}}`, c.value ), url)
}

export function generateProperties(properties, component) {
  const bindedProperties = properties.filter(prop => prop.isBinded)
  const definedValueProps = properties.filter(prop => prop.value && !bindedProperties.includes(prop))
  
  const definedValueString = definedValueProps.map( prop => `${prop.name}="${prop.value}"`).join(' ')
  const bindedPropertiesString = bindedProperties.map( prop => `:${prop.name}="props.${prop.bindTo.name}"`).join(' ')
  return bindedPropertiesString + ' ' + definedValueString
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
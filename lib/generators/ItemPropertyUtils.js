export function getReplacedUrl(properties, url) {
  return properties.reduce((p, c) => p.replaceAll(`{${c.name}}`, c.value ), url)
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function definedValue(prop) {
  const localhost = 'http://localhost:3000'
  const production = 'https://tryyourideas.com'
  if ( prop.name === 'src' && prop.method === 'search' ) {
    if (prop.value.startsWith(localhost) || prop.value.startsWith(production)) {
      const newValue = '/' + prop.value.split('/').splice(7).join('/')
      return `${prop.name}="${newValue}"`
    }
    else return `${prop.name}="${prop.value}"`

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
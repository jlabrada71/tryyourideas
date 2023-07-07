export function getReplacedUrl(properties, url) {
  return properties.reduce((p, c) => p.replaceAll(`{${c.name}}`, c.value ), url)
}

export function generateProperties(properties) {
  const definedValueProps = properties.filter(prop => prop.value)
  return definedValueProps.map( prop => `${prop.name}="${prop.value}"`).join(' ')
}

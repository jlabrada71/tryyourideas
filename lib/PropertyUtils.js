export function getReplacedUrl(props, url) {
  return props.reduce((p, c) => p.replaceAll(`{${c.name}}`, c.value ), url)
}

export function generateProperties(props) {
  const definedValueProps = props.filter(prop => prop.value)
  return definedValueProps.map( prop => `${prop.name}="${prop.value}"`).join(' ')
}

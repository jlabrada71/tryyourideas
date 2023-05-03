export const typeList =  [
  { name: 'template', props: [] }, 
  { name: 'div', props: [] }, 
  { name: 'h1', props: [] }, 
  { name: 'span', props: [] }, 
  { 
    name: 'img', 
    props: [
      { 
        name: 'src',
        type: 'string',
        default: ''
      }
    ] 
  }, 
  { name: 'section', props: [] },
  { name: 'input', 
    props:[
      {
        name: 'type',
        type: 'string',
        default: 'text',
        method: 'select',
        values: ['button', 'checkbox', 'color', 'date', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week']
      }
    ] 
}
]

export function typeFromName(name) {
  return typeList.find(type => type.name === name)
}

export const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']
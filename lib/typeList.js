export const typeList =  [
  { name: 'template', props: [] }, 
  { name: 'div', props: [] }, 
  { name: 'h1', props: [] }, 
  { name: 'a', 
    props: [
      { 
        name: 'href',
        type: 'string',
        default: ''
      },
      {
        name: 'target',
        type: 'string',
        default: '_blank',
        method: 'select',
        values: ['_blank', '_self', '_parent', '_top']
      }
    ] 
  }, 
  { name: 'span', props: [] }, 
  { name: 'img', 
    props: [
      { 
        name: 'src',
        type: 'string',
        default: ''
      }, { 
        name: 'alt',
        type: 'string',
        default: ''
      }
    ] 
  }, 
  { name: 'nav', props: [] },
  { name: 'section', props: [] },
  { name: 'article', props: [] },
  { name: 'header', props: [] },
  { name: 'main', props: [] },
  { name: 'footer', props: [] },
  { name: 'aside', props: [] },

  { name: 'label', 
    props:[
      {
        name: 'for',
        type: 'string',
        default: 'text',
        method: 'input',
      }
    ] 
  },
  { name: 'meter', 
    props:[
      {
        name: 'value',
        type: 'string',
        default: '0',
        method: 'input',
      }, {
        name: 'min',
        type: 'string',
        default: '0',
        method: 'input',
      }, {
        name: 'max',
        type: 'string',
        default: '100',
        method: 'input',
      }
    ] 
  },
  { name: 'progress', 
    props:[
      {
        name: 'value',
        type: 'string',
        default: '0',
        method: 'input',
      }, {
        name: 'max',
        type: 'string',
        default: '100',
        method: 'input',
      }
    ] 
  },
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
  },
  { name: 'button', 
    props:[
      {
        name: 'type',
        type: 'string',
        default: 'button',
        method: 'select',
        values: ['button', 'reset', 'submit']
      }, 
      {
        name: 'value',
        type: 'string',
        default: '',
        method: 'input',
      }
    ] 
  },
  { name: 'form', 
    props:[
      {
        name: 'action',
        type: 'string',
        default: '',
        method: 'input',
      },
      {
        name: 'method',
        type: 'string',
        default: 'post',
        method: 'select',
        values: ['get', 'post']
      }, {
        name: 'name',
        type: 'string',
        default: '',
        method: 'input',
      },
      {
        name: 'target',
        type: 'string',
        default: '_blank',
        method: 'select',
        values: ['_blank', '_self', '_parent', '_top']
      }
    ] 
  }, 
  { name: 'audio', 
    props: [
      { 
        name: 'src',
        type: 'string',
        default: ''
      }
    ] 
  },
]

export function typeFromName(name) {
  return typeList.find(type => type.name === name)
}

export const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']
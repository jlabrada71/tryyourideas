export const typeList =  [
  { name: 'template', props: [] }, 
  { name: 'div', props: [] }, 
  { name: 'h1', props: [] }, 
  { name: 'p', props: [] }, 
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
        values: ['', '_blank', '_self', '_parent', '_top']
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
      },
      {
        name: 'placeholder',
        type: 'string',
        default: 'placeholder',
        method: 'input',
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
      }, 
      {
        name: 'title',
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
  { name: 'Icon', 
    needsResolve: true,
    props: [
      { 
        name: 'name',
        type: 'string',
        default: ''
      },
      {
        name: 'type',
        type: 'string',
        default: 'regular',
        method: 'select',
        values: ['regular', 'solid', 'brands']
      },
      {
        name: 'svg',
        type: 'string',
        method: 'fetch',
        url: '/assets/svgs/{type}/{name}.svg',
        default: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. --><path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm130.7 57.9c-4.2-13.6 7.1-25.9 21.3-25.9H364.5c14.2 0 25.5 12.4 21.3 25.9C369 368.4 318.2 408 258.2 408s-110.8-39.6-127.5-94.1zM144.4 192a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>',
      }
    ] 
  },
]

export function typeFromName(name) {
  return typeList.find(type => type.name === name)
}

export const selfClosingTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']
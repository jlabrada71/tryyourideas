import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

const defaultCss = `
  @import 'tailwindcss/base';
  @import 'tailwindcss/components';
  @import 'tailwindcss/utilities';
`

export async function compileTailwindClasses( { classes, theme }) {

  const divs = classes.map( cls => `<div class="${cls}" />`).join('')
  const html = `<body>${divs}</body`
  const configuredTailwind = tailwindcss({
    content: [{ raw: html, extension: 'html' }],
    theme
  })
  const postcssProcessor = postcss([configuredTailwind])
  const { css } = await postcssProcessor.process(defaultCss)
  return css
}
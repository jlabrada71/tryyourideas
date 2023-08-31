import { log, debug } from '@/lib/logger.js'

import { compileTailwindClasses } from '@/lib/tailwind-utils.js'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  log('tailwindClassesGeneration POST')
  const body = await readBody(event)
  const { classes, theme } = body

  const css = await compileTailwindClasses({ classes, theme })

  return { result: 'ok', css }

})


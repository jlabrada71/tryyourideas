import { formatDate } from '@/lib/formatters/date-formatters.js'
import { useWindowScroll } from '@vueuse/core'

function log (message, context, type = 'LOG') {
  const logContext = context || getStack()[1].split('(')[0]
  
  if (typeof message === 'object') {
    message = JSON.stringify(message, null, 2)
  }
  const text = formatDate(new Date(Date.now())) + ': ' + message
  console.log(`\x1B[46m\x1B[37m${type}:${logContext}\x1B[40m\x1B[37m ${text}\x1B[0m`)
}

function debug (message, context) {
  const shouldDebug = process.env.NODE_ENV !== 'production' || process.browser && window.tyi_debug
  if (shouldDebug) {
    const debugContext = context || getStack()[1].split('(')[0]
    log(message, debugContext, 'DEBUG')
  }
}

function getStack() {
    const e = new Error('this test')
    const stack = e.stack.split('\n')
    stack.shift()
    stack.shift()
    return stack
}

export { log, debug, getStack }

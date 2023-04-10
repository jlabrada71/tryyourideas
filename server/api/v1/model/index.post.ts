import { log, debug } from '@/lib/logger'

export default defineEventHandler(async (event) => {
  console.log('API POST CALL')
    const body = await readBody(event)
    const req = event.node.req
    debug(JSON.stringify(body, null, 2))   
    //return store(req, body)
    return {
      api: 'works'
    }
})

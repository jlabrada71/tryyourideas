import { log, debug } from '@/lib/logger'
import fs from 'fs'

export default defineEventHandler(async (event) => {
  console.log('model POST')
    const body = await readBody(event)
    const req = event.node.req
    const content = JSON.stringify(body, null, 2)
    //debug(content) 
    debug(body.name)  
    fs.writeFileSync( `server/models/${body.user}/${body.name}.json`, content);
    //return store(req, body)
    return {
      api: 'works'
    }
})

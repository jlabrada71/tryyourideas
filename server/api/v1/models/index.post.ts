import { log, debug } from '@/lib/logger'
import fs from 'fs'
import path from "path"

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  console.log('model POST')
    const body = await readBody(event)
    const req = event.node.req
    const content = JSON.stringify(body, null, 2)
    //debug(content) 
    debug(body.name)  
    const dir = `${config.data}/models/${body.user}`

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
    }
    debug(path.resolve(dir))

    fs.writeFileSync( `${dir}/${body.name}.json`, content);
    //return store(req, body)
    return {
      api: 'works'
    }
})

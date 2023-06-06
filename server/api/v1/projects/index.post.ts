import { log, debug } from '@/lib/logger'
import fs from 'fs'
import path from "path"

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  console.log('model POST')
  try {
    const body = await readBody(event)
    const req = event.node.req
    const content = JSON.stringify(body, null, 2)
    //debug(content) 
    debug(body.name)  
    const dir = `${config.data}/projects/${body.userId}`
    debug(dir)

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true })
    }
    debug(path.resolve(dir))
    const fileName = `${dir}/${body.name}.json`
    debug(fileName)
    fs.writeFileSync( fileName, content)
  }
  catch(e) {
    return {
      result: 'error',
      msg: e.msg
    }
  }
  
  //return store(req, body)
  return {
    result: 'ok'
  }
})

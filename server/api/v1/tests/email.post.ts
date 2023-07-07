// curl -H "Content-Type: application/x-www-form-urlencoded" -d "param1=value1&param2=value2"  -X POST 'localhost:3000/api/test' 
//  for file: -d @data.txt
// curl -H "Content-Type: application/json" -d '{"title": "generation", "email":"jlabrada@yahoo.com", "content":"Download Link"}' -X POST 'localhost:3000/api/v1/tests/email'
//  for file: -d @data.json


import { log } from '@/lib/logger.js'
import { getEmailService } from '@/lib/emails/Service.js'

const debug = log

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const req = event.node.req
    // debug(Object.keys(req))   
    debug(body)
    return store(req, body)
})

async function store(req, body) {

  const config = useRuntimeConfig()
  const emailService = getEmailService(config)

  try {

    const result = await emailService.send(body)

    return result;
  } catch (e) {
    log(e.stack, 'message-routes')
    return { error: e.msg }
  }
}


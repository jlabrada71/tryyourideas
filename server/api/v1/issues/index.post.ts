import { log, debug } from '@/lib/logger.js'
import { getEmailService } from '@/lib/emails/Service.js'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  log('issues POST')
  const body = await readBody(event)
  // const issuesDir = `${config.data}/issues.json`
  // const issues = JSON.parse(fse.readFileSync(issuesDir))
  // debug(issues)
  // issues.issues.push(body)
  // fse.writeFileSync(issuesDir, JSON.stringify(issues, null, 2))

  const notificationText = `<html>
    <body>
      Hi Juan<br><br> 

      This is an issue report:<br>
      =================================================<br>
      ${body.message}

      <br>
      =================================================<br>
      comming from:<br>
      ${body.email}
      <br><br>
    </body>
    </html> `

  // send email with download Url

  const emailService = getEmailService(config)

  try {

    const result = await emailService.send({ title: 'Issue Notification', email: config.supportInbox, content: notificationText })

    return result;
  } catch (e) {
    log(e.stack, 'message-routes')
    return { error: e.msg }
  } 
})


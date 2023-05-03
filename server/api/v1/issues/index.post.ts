import { log, debug } from '@/lib/logger'
import fse  from 'fs-extra'
import axios from 'axios'

const config = useRuntimeConfig()

function postToServer(obj, url) {
  return axios({
    method: 'post',
    url,
    data: obj
  });
}

export default defineEventHandler(async (event) => {
  log('issues POST')
  const body = await readBody(event)
  // const issuesDir = `${config.data}/issues.json`
  // const issues = JSON.parse(fse.readFileSync(issuesDir))
  // debug(issues)
  // issues.issues.push(body)
  // fse.writeFileSync(issuesDir, JSON.stringify(issues, null, 2))

  const result = `<html>
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

  postToServer({ title: 'Issue Notification', email: 'jlabrada@yahoo.com', content: result }, config.notificationsApi)

  return;
})


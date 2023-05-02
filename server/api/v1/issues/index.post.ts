import { log, debug } from '@/lib/logger'
import fse  from 'fs-extra'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  log('issues POST')
  const body = await readBody(event)
  const issuesDir = `${config.data}/issues.json`
  const issues = JSON.parse(fse.readFileSync(issuesDir))
  debug(issues)
  issues.issues.push(body)
  fse.writeFileSync(issuesDir, JSON.stringify(issues, null, 2))
  return {
    api: 'works'
  }
})


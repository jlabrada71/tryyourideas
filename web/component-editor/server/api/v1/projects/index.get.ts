import { log, debug } from '@/lib/logger.js'
import { promises, mkdirSync, existsSync, readFileSync } from 'fs'

const { readdir } = promises

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  log('model GET')
  const query = getQuery(event)

  if (!query.userId) {
    return {
      error: 'userId is required'
    }
  }

  if (query.name) {
    return getProject(query.userId, query.name)
  }

  const files = await getProjectList(query.userId)

  //return store(req, body)
  return files
})

async function getProject(userId: string, name: string) {
  const dir = `${config.data}/projects/${userId}`
  try {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }

    const projectFile = `${dir}/${name}.json`

    const project = JSON.parse(readFileSync( projectFile ))
    return {
      result: 'ok',
      project
    }
  } catch(e) {
    return {
      result: 'error',
      msg: e.msg
    }
  }
}

async function getProjectList(userId: string) {
  const dir = `${config.data}/projects/${userId}`

  try {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }

    const files = await readdir(dir)

    return {
      files,
      result: 'ok'
    }
  } catch(e) {
    return {
      result: 'error',
      msg: e.msg
    }
  }
}


import path from 'path'
import { readdir } from 'fs/promises'
import fs from 'fs'

const getDirectories = async path => {
  const all = await readdir(path, { withFileTypes: true })
  const directories = all.filter(dirent => dirent.isDirectory())
  const files = all.filter(dirent => !dirent.isDirectory())
  return { files, directories }
}

export default defineEventHandler(async (event) => {
  const  { userId, project, directory } = getQuery(event)
  console.log(userId, directory )
  const folder = `${path.join('public', 'uploads', 'users', userId, project, directory)}`
  if (!fs.existsSync(folder)){
    fs.mkdirSync(folder, { recursive: true })
  }
    return getDirectories(folder)
});
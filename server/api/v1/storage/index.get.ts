
import { log, debug } from '@/lib/logger'
import CloudStorage from '@/lib/firebase/cloud-storage.js'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  log('storage GET ')
  debug('Reading firebase', 'Files')
  const files = await CloudStorage.getList('public/images')
  return files
})
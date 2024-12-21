import { FileRepository } from '@/lib/FileRepository.js'

export class SessionRepository extends FileRepository {
  constructor(config) {
    super(`${config.data}/accounts/sessions.json`, { createIfNotExists: true })
  }
}
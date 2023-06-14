import { FileRepository } from '@/lib/FileRepository.js'

export class CredentialRepository extends FileRepository {
  constructor(config) {
    super(`${config.data}/accounts/credentials.json`, { createIfNotExists: true })
  }
}
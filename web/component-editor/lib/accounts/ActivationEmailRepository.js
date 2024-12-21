import { FileRepository } from '@/lib/FileRepository.js'

export class ActivationEmailRepository extends FileRepository {
  constructor(config) {
    super(`${config.data}/accounts/activation-email.json`, { createIfNotExists: true })
  }
}
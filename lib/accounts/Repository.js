import { FileRepository } from '@/lib/FileRepository.js'

export class AccountRepository extends FileRepository {
  constructor(config) {
    super(`${config.data}/accounts/accounts.json`, { createIfNotExists: true })
  }
}
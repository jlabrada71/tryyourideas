import { RepositoryProxy } from './RepositoryProxy'

export class AccountRepositoryProxy extends RepositoryProxy {
  constructor(config) {
    super(`${config.apiBase}/accounts`)
  }
}
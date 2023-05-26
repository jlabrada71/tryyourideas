import { RepositoryProxy } from './RepositoryProxy'

export class ProjectRepositoryProxy extends RepositoryProxy {
  constructor(config) {
    super(`${config.apiBase}/projects`)
  }
}
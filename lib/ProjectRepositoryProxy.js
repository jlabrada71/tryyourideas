import { RepositoryProxy } from './RepositoryProxy'

export class ProjectRepositoryProxy extends RepositoryProxy {
  constructor(config) {
    console.log(`${config.public.apiBase}/projects`)
    super(`${config.public.apiBase}/projects`)
  }
}
import { ServiceProxy } from '@/lib/ServiceProxy'

export class ProjectServiceProxy extends ServiceProxy {
  constructor(config) {
    console.log(`${config.public.apiBase}/projects`)
    super(`${config.public.apiBase}/projects`)
  }
}
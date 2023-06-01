import { RepositoryProxy } from './RepositoryProxy'
import axios from 'axios'
import { toQuery } from '@/lib/url-utils'

export class AccountRepositoryProxy extends RepositoryProxy {
  constructor(config) {
    super(`${config.apiBase}/accounts`)
  }

  async activate(filter = {}) {
    const expandedFilter = toQuery(filter)
    const url = `${this.url}${expandedFilter}`
    const result = await axios({
      method: 'get',
      url
    })

    return { data: result.data, status: result.status, statusText: result.statusText }
  }

  async login(data) {
    const result = await axios({
      method: 'post',
      url: `${this.url}/login`,
      data
    })
    
    return { data: result.data, status: result.status, statusText: result.statusText }
  }
}
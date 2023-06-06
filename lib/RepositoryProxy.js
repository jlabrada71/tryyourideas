import axios from 'axios'
import { toQuery } from '@/lib/url-utils'
import { debug } from '@/lib/logger'

export class RepositoryProxy {
  constructor(url) {
    this.url = url
  }

  async select(filter = {}) {
    const expandedFilter = toQuery(filter)
    const url = `${this.url}${expandedFilter}`
    debug(url)
    const result = await axios({
      method: 'get',
      url
    })

    return { data: result.data, status: result.status, statusText: result.statusText }
  }

  async insert(data) {
    debug('Component NAME')
    debug(data.components[0].name)
    const result = await axios({
      method: 'post',
      url: this.url,
      data
    })
    
    return { data: result.data, status: result.status, statusText: result.statusText }
  }

  async update(data) {
  }
  
  async delete(filter) {
  }
}
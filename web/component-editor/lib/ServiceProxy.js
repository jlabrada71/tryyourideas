import axios from 'axios'
import { toQuery } from '@/lib/url-utils'
import { debug } from '@/lib/logger'

export class ServiceProxy {
  constructor(url) {
    this.url = url
  }

  // deprecated
  select(filter) {
    return this.get(filter)
  }

  // deprecated
  insert(data) {
    return this.post(data)
  }

  // deprecated
  update(data) {
    return this.put(data)
  }

  async get(filter = {}) {
    const expandedFilter = toQuery(filter)
    const url = `${this.url}${expandedFilter}`
    debug(url)
    const result = await axios({
      method: 'get',
      url
    })

    return { data: result.data, status: result.status, statusText: result.statusText }
  }

  async post(data) {
    const result = await axios({
      method: 'post',
      url: this.url,
      data
    })
    
    return { data: result.data, status: result.status, statusText: result.statusText }
  }

  async put(data) {
    const filter = { id: data.id }
    const expandedFilter = toQuery(filter)
    const url = `${this.url}${expandedFilter}`
    const result = await axios({
      method: 'put',
      url,
      data
    })
    
    return { data: result.data, status: result.status, statusText: result.statusText }
  }
  
  async delete(data) {
    const filter = { id: data.id }
    const expandedFilter = toQuery(filter)
    const url = `${this.url}${expandedFilter}`
    const result = await axios({
      method: 'delete',
      url
    })
    
    return { data: result.data, status: result.status, statusText: result.statusText }
  }
}
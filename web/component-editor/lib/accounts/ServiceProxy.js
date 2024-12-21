import { ServiceProxy } from '@/lib/ServiceProxy'
import axios from 'axios'
import { toQuery } from '@/lib/url-utils'

export class AccountServiceProxy extends ServiceProxy {
  constructor(config) {
    super(`${config.public.apiBase}/accounts`)
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

  async findForAccessToken(accessToken) {
    const url = `${this.url}/bytoken`
    
    const result = await axios.get(
      url,
      { 
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  

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
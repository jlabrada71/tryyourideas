import { AccountServiceProxy } from '@/lib/accounts/ServiceProxy.js'
import { debug } from '@/lib/logger.js'
import { useStorage } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()

  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')
  const currentUser = useStorage('user', {
    name: 'anonimous',
    email: 'undefined',
    id: 'undefined',
    licence: 'community',
    maxProjects: '1'
  })

  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  debug('Nuxt Middleware')
  debug(to.path)
  if (to.path === '/editor') {
    const accountService = new AccountServiceProxy(config)
    const response = await accountService.findForAccessToken(accessToken.value)
    currentUser.value = response.data.data
  }
})
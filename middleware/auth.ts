import { AccountServiceProxy } from '@/lib/accounts/ServiceProxy.js'
import { debug } from '@/lib/logger.js'
import { useEditorStorage } from '@/lib/editor/storage.js'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()

  const { currentUser, currentProject } = useEditorStorage()

  const accessToken = useCookie('access_token')

  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  debug('Nuxt Middleware')
  debug(to.path)
  debug(accessToken.value)
  if (to.path === '/editor') {
    if (accessToken.value) {
      debug('accessToken found getting user data')
      const accountService = new AccountServiceProxy(config)
      const response = await accountService.findForAccessToken(accessToken.value)
      currentUser.value = response.data.data
    } else {
      currentUser.value = {
        name: 'anonimous',
        email: 'undefined',
        id: 'undefined',
        licence: 'Free trial',
        maxProjects: '1'
      }
    }
  }
})
import { AccountServiceProxy } from '@/lib/accounts/ServiceProxy.js'
import { debug } from '@/lib/logger.js'
import { getCleanProject } from '@/lib/editor/projects.js'
import { useEditorStorage } from '@/lib/editor/storage.js'
import { ProjectServiceProxy } from '@/lib/projects/ServiceProxy'


export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()

  const projectService = new ProjectServiceProxy(config)

  async function getDefaultProject(userId) {
    const  { data } = await projectService.select({ userId, name: 'Default' })
    
    if (data.result !== 'ok' ) {
      debug(data)
      return getCleanProject()
    }
    return data.project
  }

  const { currentUser, currentProject, accessToken } = useEditorStorage()

  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  debug(`Nuxt Middleware from: '${from.path}' to: '${to.path}'`)

  if (to.path === '/editor') {
    if (accessToken.value) {
      debug('accessToken found getting user data')
      const accountService = new AccountServiceProxy(config)
      const response = await accountService.findForAccessToken(accessToken.value)
      currentUser.value = response.data.data
      currentProject.value = await getDefaultProject(currentUser.value.id)
      debug(currentProject.value)
    }
  }
})
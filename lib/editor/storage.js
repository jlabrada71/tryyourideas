import { useStorage } from '@vueuse/core'
import { getCleanProject } from '@/lib/editor/projects.js'

// by convention, composable function names start with "use"
export function useEditorStorage() {

  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')

  const currentUser = useStorage('user', {
    name: 'anonimous',
    email: 'unset',
    id: 'undefined',
    licence: 'get started',
    maxProjects: '1'
  })

  function cleanUser() {
    currentUser.value = {
      name: 'anonimous',
      email: 'unset',
      id: 'undefined',
      licence: 'get started',
      maxProjects: '1'
    }
  }

  const currentProject = useStorage('currentProject', getCleanProject())

  function cleanProject() {
    currentProject.value = getCleanProject()
  }

  if (!currentProject.value || currentProject.value == {} ) {
    currentProject.value = getCleanProject()
  }
  
  function initializeEditor() {
    cleanUser()
    currentProject.value = getCleanProject()
  }
  return { currentUser, currentProject, cleanUser, cleanProject, initializeEditor, accessToken, refreshToken }
}
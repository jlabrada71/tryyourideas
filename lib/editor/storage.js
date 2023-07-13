import { useStorage } from '@vueuse/core'
import { createNewComponent } from '@/lib/editor/components.js'

// by convention, composable function names start with "use"
export function useEditorStorage() {

  const currentUser = useStorage('user', {
    name: 'anonimous',
    email: 'unset',
    id: 'undefined',
    licence: 'free trial',
    maxProjects: '1'
  })

  const currentProject = useStorage('currentProject', {
    name: 'Default',
    dirty: false,
    components: [],
  })

  function addComponent(component) {
    currentProject.value.components.push(component)
  }

  if (currentProject.value.components.length === 0) {
    addComponent(createNewComponent(currentProject.value))
  }
  
  function initializeEditor() {
    currentUser.value = {
      name: 'anonimous',
      email: 'unset',
      id: 'undefined',
      licence: 'free trial',
      maxProjects: '1'
    }
    currentProject.value = {
      name: 'Default',
      dirty: false,
      components: [],
    }
    addComponent(createNewComponent(currentProject.value))
  }
  return { currentUser, currentProject, addComponent, initializeEditor }
}
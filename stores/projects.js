import { defineStore, acceptHMRUpdate } from 'pinia'

const useProject = defineStore('projects', {
  // options...
})

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProject, import.meta.hot))
}
<template>

  <!-- Main modal -->
  <div id="openProjectForm" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-slate-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-slate-600">
                <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
                    Open Project
                </h3>
                <button type="button" class="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white" data-modal-hide="openProjectForm">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close form</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <div class="mb-6">
                
                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" class="px-6 py-3">
                                  Project name
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr 
                            v-for="project in projectList"
                            class="bg-white border-black dark:bg-gray-800 dark:border-gray-700">
                            <th 
                              scope="row" 
                              class="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              <button
                                type="button"
                                class="
                                  block
                                  bg-slate-50
                                  w-full
                                  h-full
                                  text-start
                                  hover:bg-slate-200
                                  active:bg-slate-300
                                  focus:bg-slate-300
                                  focus:border-2 focus:border-slate-400
                                "
                                @click="selectProject(project)"
                                >{{project}}
                              </button>
                            </th> 
                          </tr>
                      </tbody>
                  </table>
                </div>

              </div>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 border-t border-slate-200 rounded-b dark:border-slate-600">
                <button @click="openProject" data-modal-hide="openProjectForm" type="button" class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Open Project</button>
                <button data-modal-hide="openProjectForm" type="button" class="text-slate-500 bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg border border-slate-200 text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-600">Cancel</button>
            </div>
        </div>
    </div>
  </div>

</template>

<script setup>
  import { ref, onMounted } from "vue"
  import { ProjectRepositoryProxy } from '@/lib/ProjectRepositoryProxy'

  const emit = defineEmits(['open'])

  const props = defineProps({
    user: {
      type: Object,
    },
  })

  const config = useRuntimeConfig()
  const projectRepository = new ProjectRepositoryProxy(config)

  const projectList = ref([])
  const selectedProject = ref(null)

  async function getProjectList(userId) {
    const result = await projectRepository.select({ userId })
    return result.data.files
  }

  async function updateProjectList(user) {
    const result = await getProjectList(user.id)
    projectList.value = result.map(project => project.substring(0, project.indexOf('.json')))

  }

  onMounted(() => {
    updateProjectList(props.user)
  })

  watchEffect(()=> {
    console.log('USER: ' + props.user.name)
    updateProjectList(props.user)
  })

  async function openProject() {
    const result = await projectRepository.select({ userId: props.user.id, name: selectedProject.value })
    emit('open', result.data.project)
  }

  function selectProject(project) {
    selectedProject.value = project
  }

</script>


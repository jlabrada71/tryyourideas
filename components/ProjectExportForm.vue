<template>

  <!-- Main modal -->
  <div id="exportProjectForm" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-slate-700">
            <!-- Modal header -->
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-slate-600">
                <h3 class="text-xl font-semibold text-slate-900 dark:text-white">
                    Export Project
                </h3>
                <button type="button" class="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white" data-modal-hide="exportProjectForm">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close form</span>
                </button>
            </div>
            <!-- Modal body -->
            <div class="p-6 space-y-6">
              <div class="mb-6">
                <label for="large-input" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Your name</label>
                <input type="text" id="user" v-model="form.user" class="block w-full p-2 text-slate-900 border border-slate-300 rounded-lg bg-slate-50 sm:text-xs focus:ring-slate-500 focus:border-slate-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
              </div>
              <div class="mb-6">
                <label for="large-input" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Project Name</label>
                <input type="text" id="name" v-model="form.name" class="block w-full p-2 text-slate-900 border border-slate-300 rounded-lg bg-slate-50 sm:text-xs focus:ring-slate-500 focus:border-slate-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
              </div>
              <div>
                  <label for="small-input" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Enter your email receive the download link</label>
                  <input type="email" id="email" v-model="form.email" class="block w-full p-2 text-slate-900 border border-slate-300 rounded-lg bg-slate-50 sm:text-xs focus:ring-slate-500 focus:border-slate-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
              </div>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 border-t border-slate-200 rounded-b dark:border-slate-600">
                <button @click="sendForm" data-modal-hide="exportProjectForm" type="button" class="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800">Send the download link</button>
                <button data-modal-hide="exportProjectForm" type="button" class="text-slate-500 bg-white hover:bg-slate-100 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg border border-slate-200 text-sm font-medium px-5 py-2.5 hover:text-slate-900 focus:z-10 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-500 dark:hover:text-white dark:hover:bg-slate-600 dark:focus:ring-slate-600">Cancel</button>
            </div>
        </div>
    </div>
  </div>

</template>

<script setup>
  import { ref, onMounted } from "vue"

  const props = defineProps({
    project: {
      type: Object,
    },
    store: {
      type: Function,
      default : () => {}
    }
  })

  const form = ref({
    name:'',
    email: '',
    user: ''
  })

  onMounted(() => {
    form.user = props.project.user
    form.name = props.project.name
    form.email = props.project.email
  })

  function sendForm() {
    props.store(form.value)
  }
</script>


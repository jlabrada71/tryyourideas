<template>
  <div id="imageSelectorForm"  class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="flex flex-col w-96 h-auto bg-slate-50 rounded-2xl">
      <div class=" flex flex-row flex-wrap justify-end bg-inherit w-full h-10 rounded-lg ">
        <button ref="closeElement" id="id-4-1-1" type="button" class=" flex flex-row bg-inherit w-6 h-6 rounded-full hover:flex hover:flex-row hover:bg-slate-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" id="id-4-1-1-1" class=" flex flex-row bg-inherit w-6 h-6 rounded-full focus:flex focus:flex-row focus:bg-inherit focus:w-6 focus:h-6 hover:flex hover:flex-row hover:bg-inherit hover:w-6 hover:h-6 " viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      </div>
      <div class="px-8 pb-8">
        <h1 class="text-3xl">Select an image</h1>
        <span class="text-slate-400">To add a new image just drop it on the box</span>
        <div ref="dropZone" class="bg-slate-50 w-80 h-80 rounded-lg border-slate-200 border-2 flex flex-wrap gap-4 p-4 overflow-y-auto">
          <span v-for="directory in directories">{{directory}}</span>
          <div @click="selectImage(file.name)" v-for="file in files"  class="w-20 h-20 m-2">
            <img :src="props.imageService.pathOfImage(file.name)" alt="">
            <!-- <span>{{file.name}}</span> -->
          </div>
        </div>
        <input type="file" @change="uploadFile" ref="file" hidden>
        <!-- <button @click="submitFile">Upload!</button> -->
        <span class="w-80 h-16 p-4">{{result}}</span>
        <div class="flex w-full place-content-between p-4">
          <button class="bg-slate-200 px-4 rounded-full" @click="cancelled">Cancel</button>
          <button class="bg-slate-300 px-4 rounded-full" @click="useSelected">Use selected</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { useDropZone } from '@vueuse/core'
  import { debug } from '@/lib/logger.js'
  import { onMounted } from 'vue'
 
  const props = defineProps({
    imageService: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['selected:image', 'cancelled'])

  const file = ref(null)
  const files = ref([])
  const directories = ref([])
  const dropZone = ref(null)
  const result = ref('')
  const closeElement = ref(null)
 
  const currentDirectory = ref('images')
  const selectedImage = ref('')
  const selectedImagePath = ref('')
  const { isOverDropZone } = useDropZone(dropZone, onDrop)

  function onDrop(files) {
    result.value = ''
    if (files) {
      submitFile(files[0])
    }
  }

  function uploadFile() {
    submitFile(file.value.files[0])
  }

  async function updateData() {
    debug('updateData')
    const result = await props.imageService.getFiles(currentDirectory.value)
    debug(result.status)
    directories.value = result.directories
    files.value = result.files
  }

  function selectImage(imageName) {
    selectedImagePath.value = props.imageService.pathOfImage(imageName)
    selectedImage.value = imageName
    result.value = `${imageName} selected`
  }

  function useSelected() {
    console.log('asdd', selectedImagePath.value)
    emit('selected:image', selectedImagePath.value)
    closeElement.value.click()
  }

  function cancelled() {
    emit('cancelled')
    closeElement.value.click()
  }

  onMounted(() => {
    updateData()
  })

  async function submitFile(file) {
    const postResult = await props.imageService.postFile(file, currentDirectory.value)
    result.value = ` ${postResult} status Image ${file.name} uploaded` //`${res.status} `
    updateData()
  }

</script>
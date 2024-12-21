<template>
  <ImageSelectorForm userId="juan" @selected:image="selectedImage"></ImageSelectorForm>
  <button  data-modal-target="imageSelectorForm" data-modal-toggle="imageSelectorForm" class=" flex flex-row bg-inherit h-8 hover:flex hover:flex-row hover:bg-inherit hover:h-8 hover:rounded-none hover:border-b-4 hover:border-solid hover:border-slate-700 ">
    <span class=" flex flex-row bg-inherit ">
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
    </span>
  </button>
  {{im}}
</template>

<script setup>
  import { initModals } from 'flowbite'
  import { debug, log } from '@/lib/logger.js'

  const config = useRuntimeConfig()

  onMounted(() => {
    initModals();
  })
  const im = ref('test')

  function selectedImage(image) {
    im.value = image
    alert(image)
  }
</script>
<template>
  
<!-- Modal toggle -->
<button data-modal-target="exportProjectForm" data-modal-toggle="exportProjectForm" class="block text-white bg-blue-400 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" type="button">
  Export Project
</button>

</template>

<script setup>
  import { initModals } from 'flowbite'

  onMounted(() => {
    initModals();
  })
</script>
<template>
  
<!-- Modal toggle -->
<button data-modal-target="exportProjectForm" data-modal-toggle="exportProjectForm" class="block text-white bg-slate-400 hover:bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700" type="button">
  Export Project
</button>

</template>

<script setup>
  import { initModals } from 'flowbite'

  onMounted(() => {
    initModals();
  })
</script>
<template>
  
  <!-- Modal toggle -->
  <button :data-modal-target="props.target" :data-modal-toggle="props.target" class="block text-white bg-slate-400 hover:bg-slate-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700" type="button">
    <slot>Open Form</slot>
  </button>

</template>

<script setup>
  const props = defineProps({
    target: {
      type: String
    }
  })
</script>
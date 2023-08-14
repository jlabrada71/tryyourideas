<template>
  <button id="id-8-1" type="button"
    :data-modal-target="props.target"
    :data-modal-toggle="props.target"
    class=" flex flex-row justify-center items-center bg-slate-200 w-10 h-10  hover:bg-slate-300 active:bg-slate-400 ">
    <slot></slot>
  </button>
</template>
<script setup>
  const props = defineProps({
    target: {
      type: String
    }
  })
</script>
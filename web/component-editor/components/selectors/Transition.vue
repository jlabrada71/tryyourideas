<template>
  <div>
    <InputListWithTag :options="transitions" :option="transition" tag="transition" @update:option="value=>emit('update:transition', value)">
      <h1 class="m-2 w-20">Transition: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['transition'])
  const emit = defineEmits(['update:transition'])

  const transitions = ['unset', 'none', 'all', 'colors', 'opacity', 'shadow', 'transform']
</script>
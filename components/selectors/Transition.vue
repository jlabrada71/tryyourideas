<template>
  <div>
    <SelectButton :options="transitions" :option="transition" @update:option="value=>emit('update:transition', value)">
      <h1>Transition: <span>{{transition}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['transition'])
  const emit = defineEmits(['update:transition'])

  const transitions = ['transition-none', 'transition-all', 'transition', 'transition-colors', 'transition-opacity', 'transition-shadow', 'transition-transform']
</script>
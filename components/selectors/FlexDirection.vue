<template>
  <div>
    <SelectButton :options="directions" :option="direction" @update:option="value=>emit('update:direction', value)">
      <h1>Flex direction: <span>{{direction}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['direction'])
  const emit = defineEmits(['update:direction'])

  const directions = ['default', 'flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse']
</script>
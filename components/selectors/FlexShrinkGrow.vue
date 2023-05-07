<template>
  <div>
    <SelectButton :options="shrinkGrows" :option="shrinkGrow" @update:option="value=>emit('update:shrinkGrow', value)">
      <h1>Flex shrink/grow: <span>{{shrinkGrow}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['shrinkGrow'])
  const emit = defineEmits(['update:shrinkGrow'])

  const shrinkGrows = ['default', 'flex-1', 'flex-auto', 'flex-initial', 'flex-none', 'grow', 'grow-0', 'shrink', 'shrink-0']
</script>
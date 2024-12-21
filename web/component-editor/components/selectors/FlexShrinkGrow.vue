<template>
  <div>
    <InputListWithTag :options="shrinkGrows" :option="shrinkGrow" tag="" @update:option="value=>emit('update:shrinkGrow', value)">
      <h1 class="m-2 w-20">Shrink/grow: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['shrinkGrow'])
  const emit = defineEmits(['update:shrinkGrow'])

  const shrinkGrows = ['unset','flex-none', 'flex-auto', 'flex-1', 'flex-initial',  'grow', 'grow-0', 'shrink', 'shrink-0']
</script>
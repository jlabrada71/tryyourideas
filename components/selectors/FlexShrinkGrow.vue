<template>
  <div>
    <InputListWithTag :options="shrinkGrows" :option="shrinkGrow" tag="flex" @update:option="value=>emit('update:shrinkGrow', value)">
      <h1 class="m-2 w-20">Shrink/grow: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['shrinkGrow'])
  const emit = defineEmits(['update:shrinkGrow'])

  const shrinkGrows = ['unset','none', 'auto', '1', 'initial',  'grow', 'grow-0', 'shrink', 'shrink-0']
</script>
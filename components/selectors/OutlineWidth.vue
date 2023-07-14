<template>
  <div>
    <RangeButton :options="borderWidths" :option="width"  tag="border" @update:option="value=>emit('update:width', value)">
      <h1 class="m-2 w-40">Outline Width: </h1>
    </RangeButton>
  </div>
</template>
<script setup>
  const props = defineProps(['width'])
  const emit = defineEmits(['update:width'])

  const borderWidths = ['unset', 'outline-0', 'outline-1', 'outline-2', 'outline-4', 'outline-8' ]
  
</script>



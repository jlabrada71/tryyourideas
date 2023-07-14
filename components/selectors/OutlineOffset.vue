<template>
  <div>
    <RangeButton :options="borderWidths" :option="width"  tag="border" @update:option="value=>emit('update:width', value)">
      <h1 class="m-2 w-40">Outline Offset: </h1>
    </RangeButton>
  </div>
</template>
<script setup>
  const props = defineProps(['width'])
  const emit = defineEmits(['update:width'])

  const borderWidths = ['unset', 'outline-offset-0', 'outline-offset-1', 'outline-offset-2', 'outline-offset-4', 'outline-offset-8' ]
  
</script>



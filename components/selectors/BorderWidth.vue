<template>
  <div>
    <h1>Border Width: <span>{{width}}</span></h1>
    <div>
      <RangeButton :options="borderWidths" :option="width" @update:option="value=>emit('update:width', value)"></RangeButton>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps(['width'])
  const emit = defineEmits(['update:width'])

  const borderWidths = ["border-0", "border-2", "border-4", "border-8", "border", "border-x-0", "border-x-2", "border-x-4", "border-x-8", "border-x", "border-y-0", "border-y-2", "border-y-4", "border-y-8", "border-y", "border-t-0", "border-t-2", "border-t-4", "border-t-8", "border-t", "border-r-0", "border-r-2", "border-r-4", "border-r-8", "border-r", "border-b-0", "border-b-2", "border-b-4", "border-b-8", "border-b", "border-l-0", "border-l-2", "border-l-4", "border-l-8", "border-l" ]
  
</script>



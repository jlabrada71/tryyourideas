<template>
  <div>
    <h1>Border Style: <span>{{style}}</span></h1>
    <div>
      <RangeButton :options="borderStyles" :option="style" @update:option="value=>emit('update:style', value)"></RangeButton>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps(['style'])
  const emit = defineEmits(['update:style'])

  const borderStyles = [
  "default", "border-solid", "border-dashed", "border-dotted", "border-double", "border-hidden", "border-none" ]
  
</script>

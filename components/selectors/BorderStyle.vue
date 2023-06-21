<template>
  <div>
    <InputListWithTag :options="borderStyles" :option="style" tag="border" @update:option="value=>emit('update:style', value)">
      <h1 class="m-2 w-20">Style: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['style'])
  const emit = defineEmits(['update:style'])

  const borderStyles = [
  'unset', "solid", "dashed", "dotted", "double", "hidden", "none" ]
  
</script>

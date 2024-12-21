<template>
  <div>
    <InputListWithTag :options="borderWidths" :option="width"  tag="border" @update:option="value=>emit('update:width', value)">
      <h1 class="m-2 w-20">Width: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['width'])
  const emit = defineEmits(['update:width'])

  const borderWidths = ['unset', "0", "2", "4", "8", "x-0", "x-2", "x-4", "x-8", "y-0", "y-2", "y-4", "y-8", "t-0", "t-2", "t-4", "t-8", "r-0", "r-2", "r-4", "r-8", "b-0", "b-2", "b-4", "b-8", "l-0", "l-2", "l-4", "l-8" ]
  
</script>



<template>
  <div>
    <InputListWithTag 
      :options="backgroundOrigins" 
      :option="origin" tag="bg-origin" 
      @update:option="value=>emit('update:origin', value)">
      <h1 class="m-2 w-20">Origin: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['origin'])
  const emit = defineEmits(['update:origin'])

  const backgroundOrigins = [ 'unset', "border", "padding", "content" ]
  
</script>

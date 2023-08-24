<template>
  <div>
    <InputListWithTag 
      :options="backgroundSizes" 
      :option="size" tag="bg" 
      @update:option="value=>emit('update:size', value)">
      <h1 class="m-2 w-20">Size: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['size'])
  const emit = defineEmits(['update:size'])

  const backgroundSizes = [ 'unset', "auto", "cover", "contain" ]
  
</script>

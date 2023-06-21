<template>
  <div>
    <InputListWithTag :options="families" :option="family" tag="font" @update:option="value=>emit('update:family', value)" >
      <h1 class="m-2 w-20">Family: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['family'])
  const emit = defineEmits(['update:family'])

  const families = ['unset', 'sans', 'serif', 'mono']
</script>
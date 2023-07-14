<template>
  <div>
    <InputListWithTag :options="backgroundClips" :option="clip" tag="bg-clip" @update:option="value=>emit('update:clip', value)">
      <h1 class="m-2 w-20">Clip: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['clip'])
  const emit = defineEmits(['update:clip'])

  const backgroundClips = [ 'unset', "border", "padding", "content", "text" ]
  
</script>

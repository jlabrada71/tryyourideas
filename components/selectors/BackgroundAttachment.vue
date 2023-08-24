<template>
  <div>
    <InputListWithTag 
      :options="backgroundAttachments" 
      :option="attachment" tag="bg" 
      @update:option="value=>emit('update:attachment', value)">
      <h1 class="m-2 w-20">Attachment: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['attachment'])
  const emit = defineEmits(['update:attachment'])

  const backgroundAttachments = [ 'unset', "fixed", "local", "scroll" ]
  
</script>

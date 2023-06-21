<template>
  <div>
    <InputListWithTag :options="spacings" :option="spacing" tag="tracking" @update:option="value=>emit('update:spacing', value)">
      <h1 class="m-2 w-20">Spacing: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['spacing'])
  const emit = defineEmits(['update:spacing'])

  const spacings = ['unset', 'tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
</script>


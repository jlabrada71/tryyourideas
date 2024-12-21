<template>
  <div>
    <InputListWithTag :options="directions" :option="direction" tag="flex" @update:option="value=>emit('update:direction', value)">
      <h1 class="m-2 w-20">Direction: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['direction'])
  const emit = defineEmits(['update:direction'])

  const directions = ['unset', 'row', 'row-reverse', 'col', 'col-reverse']
</script>
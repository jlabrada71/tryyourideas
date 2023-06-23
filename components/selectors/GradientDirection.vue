<template>
  <div>
    <InputListWithTag :options="directionList" :option="direction" tag="bg-gradient" @update:option="value=>emit('update:direction', value)">
      <h1>Direction: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['direction'])
  const emit = defineEmits(['update:direction'])

 const directionList = ['unset', 'to-t', 'to-tr', 'to-r', 'to-br', 'to-b', 'to-bl', 'to-l', 'to-tl']

</script>




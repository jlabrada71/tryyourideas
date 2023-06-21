<template>
  <div>
    <InputListWithTag :options="directionList" :option="direction" @update:option="value=>emit('update:direction', value)">
      <h1>Direction: {{direction}}</h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['direction'])
  const emit = defineEmits(['update:direction'])

 const directionList = ['unset', 'bg-none', 'bg-gradient-to-t', 'bg-gradient-to-tr', 'bg-gradient-to-r', 'bg-gradient-to-br', 'bg-gradient-to-b', 'bg-gradient-to-bl', 'bg-gradient-to-l', 'bg-gradient-to-tl']

</script>




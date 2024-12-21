<template>
  <div>
    <InputListWithTag :options="transforms" :option="transform" tag="rotate" @update:option="value=>emit('update:transform', value)">
      <h1 class="m-2 w-20">Rotate: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['transform'])
  const emit = defineEmits(['update:transform'])

  const transforms = ['unset', '0', '1', '2', '3', '6', '12', '45', '90', '180']
  
  </script>
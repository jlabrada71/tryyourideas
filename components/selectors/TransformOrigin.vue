<template>
  <div>
    <InputListWithTag :options="transforms" :option="transform" tag="origin" @update:option="value=>emit('update:transform', value)">
      <h1 class="m-2 w-20">Origin: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['transform'])
  const emit = defineEmits(['update:transform'])

  const transforms = ['unset', 'center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left']
  
  </script>


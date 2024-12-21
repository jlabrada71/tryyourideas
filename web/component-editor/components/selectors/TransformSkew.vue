<template>
  <div>
    <InputListWithTag :options="transforms" :option="transform" tag="skew" @update:option="value=>emit('update:transform', value)">
      <h1 class="m-2 w-20">Skew: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['transform'])
  const emit = defineEmits(['update:transform'])

  const transforms = ['unset', 'x-0', 'y-0', 'x-1', 'y-1', 'x-2', 'y-2', 'x-3', 'y-3', 'x-6', 'y-6', 'x-12', 'y-12']
  
  </script>


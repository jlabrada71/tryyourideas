<template>
  <div>
    <SelectButton :options="transforms" :option="transform" @update:option="value=>emit('update:transform', value)">
      <h1>Origin: <span>{{transform}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['transform'])
  const emit = defineEmits(['update:transform'])

  const transforms = ['unset', 'origin-center', 'origin-top', 'origin-top-right', 'origin-right', 'origin-bottom-right', 'origin-bottom', 'origin-bottom-left', 'origin-left', 'origin-top-left']
  
  </script>


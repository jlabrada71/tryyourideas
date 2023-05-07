<template>
  <div>
    <SelectButton :options="transforms" :option="transform" @update:option="value=>emit('update:transform', value)">
      <h1>Rotate: <span>{{transform}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['transform'])
  const emit = defineEmits(['update:transform'])

  const transforms = ['default', 'rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-6', 'rotate-12', 'rotate-45', 'rotate-90', 'rotate-180']
  
  </script>
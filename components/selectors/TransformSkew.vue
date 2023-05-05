<template>
  <div>
    <RangeButton :options="transforms" :option="transform" @update:option="value=>emit('update:transform', value)">
      <h1>Skew: <span>{{transform}}</span></h1>
    </RangeButton>
  </div>
</template>
<script setup>
  const props = defineProps(['transform'])
  const emit = defineEmits(['update:transform'])

  const transforms = ['default', 'skew-x-0', 'skew-y-0', 'skew-x-1', 'skew-y-1', 'skew-x-2', 'skew-y-2', 'skew-x-3', 'skew-y-3', 'skew-x-6', 'skew-y-6', 'skew-x-12', 'skew-y-12']
  
  </script>


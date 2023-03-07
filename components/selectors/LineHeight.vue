<template>
  <div>
    <RangeButton :options="heights" :option="height" @update:option="value=>emit('update:height', value)">
      <h1>Line height: <span>{{height}}</span></h1>
    </RangeButton>
  </div>
</template>
<script setup>
  const props = defineProps(['height'])
  const emit = defineEmits(['update:height'])

  const heights = ['default', 'leading-3', 'leading-4', 'leading-5', 'leading-6', 'leading-7', 'leading-8', 'leading-9', 'leading-10', 'leading-none', 'leading-tight', 'leading-snug', 'leading-normal', 'leading-relaxed', 'leading-loose']
</script>


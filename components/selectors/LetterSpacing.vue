<template>
  <div>
    <h1>Spacing: <span>{{spacing}}</span></h1>
    <div>
      <RangeButton :options="spacings" :option="spacing" @update:option="value=>emit('update:spacing', value)"></RangeButton>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps(['spacing'])
  const emit = defineEmits(['update:spacing'])

  const spacings = ['tracking-tighter', 'tracking-tight', 'tracking-normal', 'tracking-wide', 'tracking-wider', 'tracking-widest']
</script>


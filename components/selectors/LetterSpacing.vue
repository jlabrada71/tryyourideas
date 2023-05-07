<template>
  <div>
    <SelectButton :options="spacings" :option="spacing" @update:option="value=>emit('update:spacing', value)">
      <h1>Spacing: <span>{{spacing}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['spacing'])
  const emit = defineEmits(['update:spacing'])

  const spacings = ['default', 'tracking-tighter', 'tracking-tight', 'tracking-normal', 'tracking-wide', 'tracking-wider', 'tracking-widest']
</script>


<template>
  <div>
    <RangeButton :options="families" :option="family" @update:option="value=>emit('update:family', value)">
      <h1>Family: <span>{{family}}</span></h1>
    </RangeButton>
  </div>
</template>
<script setup>
  const props = defineProps(['family'])
  const emit = defineEmits(['update:family'])

  const families = ['default', 'font-sans', 'font-serif', 'font-mono']
</script>
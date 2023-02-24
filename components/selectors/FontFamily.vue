<template>
  <div>
    <h1>Family: <span>{{family}}</span></h1>
    <div>
      <RangeButton :options="families" :option="family" @update:option="value=>emit('update:family', value)"></RangeButton>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps(['family'])
  const emit = defineEmits(['update:family'])

  const families = ['font-sans', 'font-serif', 'font-mono']
</script>
<template>
  <div>
    <SelectButton :options="families" :option="family" @update:option="value=>emit('update:family', value)">
      <h1>Family: <span>{{family}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['family'])
  const emit = defineEmits(['update:family'])

  const families = ['unset', 'font-sans', 'font-serif', 'font-mono']
</script>
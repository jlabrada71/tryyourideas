<template>
  <div>
    <SelectButton :options="transitions" :option="transition" @update:option="value=>emit('update:transition', value)">
      <h1>Duration: <span>{{transition}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['transition'])
  const emit = defineEmits(['update:transition'])

  const transitions = ['duration-0', 'duration-75', 'duration-100', 'duration-150', 'duration-200', 'duration-300', 'duration-500', 'duration-700', 'duration-1000']
  </script>
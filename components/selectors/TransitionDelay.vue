<template>
  <div>
    <SelectButton :options="transitions" :option="transition" @update:option="value=>emit('update:transition', value)">
      <h1>Delay: <span>{{transition}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['transition'])
  const emit = defineEmits(['update:transition'])

  const transitions = ['delay-0', 'delay-75', 'delay-100', 'delay-150', 'delay-200', 'delay-300', 'delay-500', 'delay-700', 'delay-1000']
  </script>
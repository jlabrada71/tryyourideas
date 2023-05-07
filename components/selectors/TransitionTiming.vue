<template>
  <div>
    <SelectButton :options="transitions" :option="transition" @update:option="value=>emit('update:transition', value)">
      <h1>Timing function: <span>{{transition}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['transition'])
  const emit = defineEmits(['update:transition'])

  const transitions = ['ease-linear', 'ease-in', 'ease-out', 'ease-in-out']
  </script>
<template>
  <div>
    <SelectButton :options="animations" :option="animation" @update:option="value=>emit('update:animation', value)">
      <h1>Animation: <span>{{animation}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['animation'])
  const emit = defineEmits(['update:animation'])

  const animations = ['animate-none', 'animate-spin', 'animate-ping', 'animate-pulse', 'animate-bounce']
  </script>
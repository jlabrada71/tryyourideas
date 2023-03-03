<template>
  <div>
    <h1>Size: <span>{{size}}</span></h1>
    <div>
      <RangeButton :options="sizes" :option="size" @update:option="value=>emit('update:size', value)"></RangeButton>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps(['size'])
  const emit = defineEmits(['update:size'])

  const sizes = ['default', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl']
</script>

<template>
  <div>
    <RangeButton :options="wraps" :option="wrap" @update:option="value=>emit('update:wrap', value)">
      <h1>Flex wrap: <span>{{wrap}}</span></h1>
    </RangeButton>
  </div>
</template>
<script setup>
  const props = defineProps(['wrap'])
  const emit = defineEmits(['update:wrap'])

  const wraps = ['default', 'flex-wrap', 'flex-wrap-reverse', 'flex-nowrap']
</script>
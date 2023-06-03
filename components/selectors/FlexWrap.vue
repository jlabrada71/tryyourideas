<template>
  <div>
    <SelectButton :options="wraps" :option="wrap" @update:option="value=>emit('update:wrap', value)">
      <h1>Flex wrap: <span>{{wrap}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['wrap'])
  const emit = defineEmits(['update:wrap'])

  const wraps = ['unset', 'flex-wrap', 'flex-wrap-reverse', 'flex-nowrap']
</script>
<template>
  <div>
    <InputListWithTag :options="wraps" :option="wrap" tag="flex" @update:option="value=>emit('update:wrap', value)">
      <h1 class="m-2 w-20">Wrap: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['wrap'])
  const emit = defineEmits(['update:wrap'])

  const wraps = ['unset', 'wrap', 'wrap-reverse', 'nowrap']
</script>
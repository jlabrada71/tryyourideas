<template>
  <div>
    <InputListWithTag :options="heights" :option="height" tag="leading" @update:option="value=>emit('update:height', value)">
      <h1 class="m-2 w-20">Leading: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['height'])
  const emit = defineEmits(['update:height'])

  const heights = ['unset', 'none', 'tight', 'snug', 'normal', 'relaxed', 'loose', '3', '4', '5', '6', '7', '8', '9', '10']
</script>


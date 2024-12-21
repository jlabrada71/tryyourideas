<template>
  <div>
    <InputListWithTag :options="animations" :option="animation"  tag="animate" @update:option="value=>emit('update:animation', value)">
      <h1 class="m-2 w-20">Animation: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['animation'])
  const emit = defineEmits(['update:animation'])

  const animations = ['unset', 'none', 'spin', 'ping', 'pulse', 'bounce']
  </script>
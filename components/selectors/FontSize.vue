<template>
  <div>
    <InputListWithTag :options="sizes" :option="size" tag="text" @update:option="value=>emit('update:size', value)" >
      <h1 class="m-2 w-20">Size: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['size'])
  const emit = defineEmits(['update:size'])

  const sizes = ['unset', 'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']
</script>

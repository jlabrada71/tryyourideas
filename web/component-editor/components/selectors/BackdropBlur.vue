<template>
  <div>
    <InputListWithTag :options="blurs" :option="blur" tag="backdrop-blur" @update:option="value=>emit('update:blur', value)" >
      <h1 class="m-2 w-20">B blur: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['blur'])
  const emit = defineEmits(['update:blur'])

  const blurs = ['unset', 'none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl']
</script>

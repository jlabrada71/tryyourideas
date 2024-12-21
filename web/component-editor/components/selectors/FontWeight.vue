<template>
  <div>
    <InputListWithTag :options="weights" :option="weight" tag="font" @update:option="value=>emit('update:weight', value)" >
      <h1 class="m-2 w-20">Weight: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['weight'])
  const emit = defineEmits(['update:weight'])

  const weights = ['unset', 'thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']
</script>


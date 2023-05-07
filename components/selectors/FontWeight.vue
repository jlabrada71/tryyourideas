<template>
  <div>
    <SelectButton :options="weights" :option="weight" @update:option="value=>emit('update:weight', value)">
      <h1>Weight: <span>{{weight}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['weight'])
  const emit = defineEmits(['update:weight'])

  const weights = ['default', 'font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold', 'font-extrabold', 'font-black']
</script>


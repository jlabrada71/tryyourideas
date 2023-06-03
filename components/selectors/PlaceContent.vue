<template>
  <div>
    <SelectButton :options="placeList" :option="place" @update:option="value=>emit('update:place', value)">
      <h1>Place content: {{place}}</h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['place'])
  const emit = defineEmits(['update:place'])

 const placeList = ['unset','place-content-normal', 'place-content-start', 'place-content-end', 'place-content-center', 'place-content-between', 'place-content-around', 'place-content-evenly', 'place-content-baseline', 'place-content-stretch']

</script>


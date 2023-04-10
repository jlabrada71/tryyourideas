<template>
  <div>
    <RangeButton :options="placeList" :option="place" @update:option="value=>emit('update:place', value)">
      <h1>Place content: {{place}}</h1>
    </RangeButton>
  </div>
</template>
<script setup>
  const props = defineProps(['place'])
  const emit = defineEmits(['update:place'])

 const placeList = ['default','place-content-normal', 'place-content-start', 'place-content-end', 'place-content-center', 'place-content-between', 'place-content-around', 'place-content-evenly', 'place-content-baseline', 'place-content-stretch']

</script>


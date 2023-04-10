<template>
  <div>
    <RangeButton :options="placeList" :option="place" @update:option="value=>emit('update:place', value)">
      <h1>Place self: {{place}}</h1>
    </RangeButton>
  </div>
</template>
<script setup>
  const props = defineProps(['place'])
  const emit = defineEmits(['update:place'])

 const placeList = ['default', 'place-self-auto', 'place-self-start', 'place-self-end', 'place-self-center', 'place-self-stretch']

</script>


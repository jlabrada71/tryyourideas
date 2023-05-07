<template>
  <div>
    <SelectButton :options="placeList" :option="place" @update:option="value=>emit('update:place', value)">
      <h1>Place items: {{place}}</h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['place'])
  const emit = defineEmits(['update:place'])

 const placeList = ['default', 'place-items-start', 'place-items-end', 'place-items-center', 'place-items-baseline', 'place-items-stretch']

</script>


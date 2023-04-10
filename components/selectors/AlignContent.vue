<template>
  <div>
    <RangeButton :options="alignList" :option="align" @update:option="value=>emit('update:align', value)">
      <h1>align content: {{align}}</h1>
    </RangeButton>
  </div>
</template>
<script setup>
  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])

 const alignList = ['default','content-normal', 'content-start', 'content-end', 'content-center', 'content-between', 'content-around', 'content-evenly', 'content-baseline', 'content-stretch']

</script>


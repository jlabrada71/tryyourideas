<template>
  <div>
    <RangeButton :options="alignList" :option="align" @update:option="value=>emit('update:align', value)">
      <h1>Align items: {{align}}</h1>
    </RangeButton>
  </div>
</template>
<script setup>
  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])

 const alignList = ['default', 'items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch']

</script>


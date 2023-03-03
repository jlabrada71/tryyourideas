<template>
  <div>
    <h1>Align: <span>{{align}}</span></h1>
    <div>
      <RangeButton :options="aligns" :option="align" @update:option="value=>emit('update:align', value)"></RangeButton>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])

  const aligns = ['default', 'text-left', 'text-center', 'text-right', 'text-justify', 'text-start', 'text-end']
</script>



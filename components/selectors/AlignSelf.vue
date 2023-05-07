<template>
  <div>
    <SelectButton :options="alignList" :option="align" @update:option="value=>emit('update:align', value)">
      <h1>Align self: {{align}}</h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])

 const alignList = ['default', 'self-auto', 'self-start', 'self-end', 'self-center', 'self-baseline', 'self-stretch']

</script>


<template>
  <div>
    <SelectButton :options="alignList" :option="align" @update:option="value=>emit('update:align', value)">
      <h1>Align items: {{align}}</h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])

 const alignList = ['unset', 'items-start', 'items-end', 'items-center', 'items-baseline', 'items-stretch']

</script>


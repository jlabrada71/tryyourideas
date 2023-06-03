<template>
  <div>
    <SelectButton :options="aligns" :option="align" @update:option="value=>emit('update:align', value)">
      <h1>Vertical Align: <span>{{align}}</span></h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])

  const aligns = ['unset', 'align-baseline', 'align-top', 'align-middle', 'align-bottom', 'align-text-top', 'align-text-bottom', 'align-sub', 'align-super']
</script>



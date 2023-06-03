<template>
  <div>
    <SelectButton :options="justifyList" :option="justify" @update:option="value=>emit('update:justify', value)">
      <h1>Justify items: {{justify}}</h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['justify'])
  const emit = defineEmits(['update:justify'])

 const justifyList = ['unset', 'justify-items-start', 'justify-items-end', 'justify-items-center', 'justify-items-stretch']

</script>


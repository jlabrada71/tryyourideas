<template>
  <div>
    <SelectButton :options="justifyList" :option="justify" @update:option="value=>emit('update:justify', value)">
      <h1>Justify self: {{justify}}</h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['justify'])
  const emit = defineEmits(['update:justify'])

 const justifyList = ['unset', 'justify-self-auto', 'justify-self-start', 'justify-self-end', 'justify-self-center', 'justify-self-stretch']

</script>


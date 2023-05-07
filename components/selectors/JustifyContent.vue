<template>
  <div>
    <SelectButton :options="justifyList" :option="justify" @update:option="value=>emit('update:justify', value)">
      <h1>Justify content: {{justify}}</h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['justify'])
  const emit = defineEmits(['update:justify'])

 const justifyList = ['default','justify-normal', 'justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly', 'justify-stretch']

</script>


<template>
  <div>
    <SelectButton :options="shadows" :option="shadow" @update:option="value=>emit('update:shadow', value)">
      <h1>Shadow: {{shadow}}</h1>
    </SelectButton>
  </div>
</template>
<script setup>
  const props = defineProps(['shadow'])
  const emit = defineEmits(['update:shadow'])

  const shadows = ['default', "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-inner", "shadow-none" ]
  // sm md lg xl 2xl inner none

</script>


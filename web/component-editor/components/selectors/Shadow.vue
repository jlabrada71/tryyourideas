<template>
  <div>
    <InputListWithTag :options="shadows" :option="shadow" tag="shadow" @update:option="value=>emit('update:shadow', value)">
      <h1 class="m-2 w-20">Shadow: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['shadow'])
  const emit = defineEmits(['update:shadow'])

  const shadows = ['unset', "none", "sm", "md", "lg", "xl", "2xl", "inner" ]

</script>


<template>
  <div>
    <InputListWithTag :options="aligns" :option="align"  tag="text" @update:option="value=>emit('update:align', value)">
      <h1 class="m-2 w-20">Align: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])

  const aligns = ['unset', 'left', 'center', 'right', 'justify', 'start', 'end']
</script>



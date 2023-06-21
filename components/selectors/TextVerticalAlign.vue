<template>
  <div>
    <InputListWithTag :options="aligns" :option="align" tag="align" @update:option="value=>emit('update:align', value)">
      <h1 class="m-2 w-20">V Align: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['align'])
  const emit = defineEmits(['update:align'])

  const aligns = ['unset', 'baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super']
</script>



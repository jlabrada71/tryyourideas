<template>
  <div>
    <InputListWithTag :options="opacitys" :option="opacity" tag="opacity" @update:option="value=>emit('update:opacity', value)" >
      <h1 class="m-2 w-20">Opacity: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['opacity'])
  const emit = defineEmits(['update:opacity'])

  const opacitys = ['unset', '0', '5', '10', '20', '25', '30', '40', '50', '60', '70', '75', '80', '90', '95', '100']
</script>

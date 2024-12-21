<template>
  <div>
    <InputListWithTag :options="gapList" :option="gap"  tag="gap" @update:option="value=>emit('update:gap', value)">
      <h1 class="m-2 w-20">Gap: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['gap'])
  const emit = defineEmits(['update:gap'])

 const gapList = ['unset',  "px", "0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96"]

</script>


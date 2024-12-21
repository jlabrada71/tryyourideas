<template>
  <div>
    <InputListWithTag :options="transitions" :option="transition" tag="ease" @update:option="value=>emit('update:transition', value)">
      <h1 class="m-2 w-20">Timing: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['transition'])
  const emit = defineEmits(['update:transition'])

  const transitions = ['unset', 'linear', 'in', 'out', 'in-out']
  </script>
<template>
  <div>
    <InputListWithTag :options="transitions" :option="transition" tag="delay" @update:option="value=>emit('update:transition', value)">
      <h1 class="m-2 w-20">Delay: </h1>
    </InputListWithTag>
  </div>
</template>
<script setup>
  const props = defineProps(['transition'])
  const emit = defineEmits(['update:transition'])

  const transitions = ['unset', '0', '75', '100', '150', '200', '300', '500', '700', '1000']
  </script>
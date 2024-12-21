<template>
  <component is="svg" v-html="props.svg"></component>
</template>
<script setup>
  const props = defineProps({
    svg: {
      type: String,
    },
  })
</script>
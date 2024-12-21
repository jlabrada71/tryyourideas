<template>
  <SelectorsBorderRadius v-model:radius = "borderRadius"></SelectorsBorderRadius>
  <div>Range-test: {{borderRadius}}</div>
</template>
<script setup>
import { ref } from 'vue'

const borderRadius = ref('rounded-none')


</script>
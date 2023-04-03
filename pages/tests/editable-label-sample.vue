<template>
  <h1>This is a test label</h1>
  <EditableLabel v-model:text="text" bgcolor="bg-blue" validator="[A-Z][A-Za-z0-9\-]*" ></EditableLabel>
</template>
<script setup>

const text = ref('this is a test')
</script>
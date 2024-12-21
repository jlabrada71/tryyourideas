<template>
  <SelectorsBackgroundColor v-model:color="backgroundColor"></SelectorsBackgroundColor>
  <SelectorsTextColor v-model:color="textColor"></SelectorsTextColor>
  <div :class="buttonClass">This is a test</div>
</template>
<script setup>
import { ref, computed } from 'vue'

const backgroundColor = ref('bg-blue-500')
const textColor = ref('text-black')
const buttonClass = computed(() => `${backgroundColor.value} ${textColor.value}`)
</script>
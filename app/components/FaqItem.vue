<script setup lang="ts">
defineProps<{
  question: string
  answer: string
}>()
</script>

<template>
  <details class="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:border-sky-300 transition group">
    <summary class="flex items-center justify-between font-semibold text-gray-900 text-lg">
      {{ question }}
      <span class="text-2xl text-sky-600 group-open:rotate-45 transition">+</span>
    </summary>
    <p class="text-gray-600 mt-4 leading-relaxed">
      {{ answer }}
    </p>
  </details>
</template>

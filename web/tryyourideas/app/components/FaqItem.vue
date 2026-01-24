<script setup lang="ts">
defineProps<{
  question: string
  answer: string
}>()
</script>

<template>
  <details class="bg-card-dark border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-primary/30 transition group">
    <summary class="flex items-center justify-between font-bold text-white text-lg">
      {{ question }}
      <span class="text-2xl text-primary group-open:rotate-45 transition">+</span>
    </summary>
    <p class="text-slate-400 mt-4 leading-relaxed">
      {{ answer }}
    </p>
  </details>
</template>

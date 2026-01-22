<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="p-8 rounded-2xl border border-white/10 hover:border-primary/30 bg-card-dark/50 hover:bg-card-dark transition">
    <div class="text-4xl mb-4">
      {{ icon }}
    </div>
    <h3 class="text-xl font-bold text-white mb-3">
      {{ title }}
    </h3>
    <p class="text-slate-400">
      {{ description }}
    </p>
  </div>
</template>

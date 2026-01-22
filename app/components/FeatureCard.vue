<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>()
</script>

<template>
  <div class="p-8 rounded-xl border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition">
    <div class="text-4xl mb-4">
      {{ icon }}
    </div>
    <h3 class="text-xl font-bold text-gray-900 mb-3">
      {{ title }}
    </h3>
    <p class="text-gray-600">
      {{ description }}
    </p>
  </div>
</template>

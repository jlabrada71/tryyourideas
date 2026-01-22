<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<template>
  <div class="text-center mb-16">
    <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="text-xl text-gray-600 max-w-2xl mx-auto">
      {{ subtitle }}
    </p>
    <slot />
  </div>
</template>

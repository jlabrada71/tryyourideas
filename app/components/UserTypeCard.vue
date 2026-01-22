<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  cta: string
  color: 'blue' | 'purple' | 'green'
}>()

const colorClasses = {
  blue: 'bg-sky-600 hover:bg-sky-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
  green: 'bg-green-600 hover:bg-green-700'
}
</script>

<template>
  <div class="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition border border-gray-200">
    <div class="text-5xl mb-4">
      {{ icon }}
    </div>
    <h3 class="text-2xl font-bold text-gray-900 mb-3">
      {{ title }}
    </h3>
    <p class="text-gray-600 mb-6 leading-relaxed">
      {{ description }}
    </p>
    <button
      :class="['w-full py-3 rounded-lg font-semibold transition text-white', colorClasses[color]]"
    >
      {{ cta }}
    </button>
  </div>
</template>

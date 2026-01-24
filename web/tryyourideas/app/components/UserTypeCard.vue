<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  cta: string
  color: 'blue' | 'purple' | 'green'
}>()

const colorClasses = {
  blue: 'bg-blue-500 hover:bg-blue-600',
  purple: 'bg-purple-500 hover:bg-purple-600',
  green: 'bg-green-500 hover:bg-green-600'
}
</script>

<template>
  <div class="bg-card-dark rounded-2xl p-8 hover:bg-card-dark/80 transition border border-white/10 hover:border-primary/30">
    <div class="text-5xl mb-4">
      {{ icon }}
    </div>
    <h3 class="text-2xl font-bold text-white mb-3">
      {{ title }}
    </h3>
    <p class="text-slate-400 mb-6 leading-relaxed">
      {{ description }}
    </p>
    <button
      type="button"
      :class="['w-full py-3 rounded-xl font-bold transition text-white', colorClasses[color]]"
    >
      {{ cta }}
    </button>
  </div>
</template>

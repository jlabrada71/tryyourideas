<script setup lang="ts">
defineProps<{
  title: string
  steps: string[]
  color: 'sky' | 'purple' | 'green'
}>()

const colorClasses = {
  sky: {
    border: 'border-blue-500/30',
    badge: 'bg-blue-500'
  },
  purple: {
    border: 'border-purple-500/30',
    badge: 'bg-purple-500'
  },
  green: {
    border: 'border-green-500/30',
    badge: 'bg-green-500'
  }
}
</script>

<template>
  <div :class="['bg-card-dark rounded-2xl p-8 h-full border-2', colorClasses[color].border]">
    <h3 class="text-2xl font-bold text-white mb-6">
      {{ title }}
    </h3>
    <ol class="space-y-4">
      <li v-for="(step, index) in steps" :key="index" class="flex gap-4">
        <span
          :class="['flex-shrink-0 w-8 h-8 text-white rounded-full flex items-center justify-center font-bold text-sm', colorClasses[color].badge]"
        >
          {{ index + 1 }}
        </span>
        <span class="text-slate-300">{{ step }}</span>
      </li>
    </ol>
  </div>
</template>

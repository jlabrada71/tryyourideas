<script setup lang="ts">
defineProps<{
  icon: string
  iconColor?: string
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="bg-card-dark border border-white/10 p-4 rounded-2xl shadow-2xl">
    <div class="flex items-center gap-3">
      <div :class="['size-10 rounded-full flex items-center justify-center', iconColor || 'bg-primary/20']">
        <Icon :name="icon" :class="iconColor ? '' : 'text-primary'" />
      </div>
      <div>
        <p class="text-xs font-bold text-white">{{ title }}</p>
        <p class="text-[10px] text-slate-400">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

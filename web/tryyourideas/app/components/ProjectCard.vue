<script setup lang="ts">
defineProps<{
  title: string
  description: string
  tag: string
  tagColor: 'primary' | 'amber' | 'blue' | 'purple'
  author: string
}>()

const tagColorClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  amber: 'bg-amber-500/10 text-amber-500',
  blue: 'bg-blue-500/10 text-blue-500',
  purple: 'bg-purple-500/10 text-purple-500'
}
</script>

<template>
  <div class="group bg-card-dark/50 hover:bg-card-dark border border-white/5 hover:border-primary/30 p-5 rounded-2xl transition-all cursor-pointer">
    <div class="aspect-video rounded-xl mb-4 bg-gradient-to-br from-primary/20 to-card-dark flex items-center justify-center">
      <Icon name="mdi:folder-open" class="text-4xl text-primary/50" />
    </div>
    <div class="space-y-3">
      <div class="flex justify-between items-start">
        <h4 class="text-lg font-bold text-white group-hover:text-primary transition-colors">
          {{ title }}
        </h4>
        <span :class="['px-2 py-0.5 rounded text-[10px] font-bold', tagColorClasses[tagColor]]">
          {{ tag }}
        </span>
      </div>
      <p class="text-sm text-slate-400 line-clamp-2 leading-relaxed">
        {{ description }}
      </p>
      <div class="flex items-center gap-2 pt-2 border-t border-white/5">
        <div class="size-6 rounded-full bg-slate-700" />
        <span class="text-xs text-slate-500 font-medium">By {{ author }}</span>
      </div>
    </div>
  </div>
</template>

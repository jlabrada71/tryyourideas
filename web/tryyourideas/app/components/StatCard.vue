<script setup lang="ts">
defineProps<{
  icon: string
  number: string
  label: string
}>()
</script>

<template>
  <div class="flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-white/5">
    <div class="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
      <Icon :name="icon" class="text-2xl" />
    </div>
    <div>
      <p class="text-3xl font-black text-white">{{ number }}</p>
      <p class="text-xs font-medium uppercase tracking-wider text-slate-500">{{ label }}</p>
    </div>
  </div>
</template>

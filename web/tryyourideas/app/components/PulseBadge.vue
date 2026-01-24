<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase">
    <span class="relative flex h-2 w-2">
      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      <span class="relative inline-flex rounded-full h-2 w-2 bg-primary" />
    </span>
    {{ text }}
  </span>
</template>

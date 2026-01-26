<script setup lang="ts">
interface NavLink {
  href: string
  label: string
}

withDefaults(defineProps<{
  brandName?: string
  navLinks?: NavLink[]
}>(), {
  brandName: 'Try Your Ideas',
  navLinks: () => [
    { href: '#', label: 'Projects' },
    { href: '#', label: 'Developers' },
    { href: '#', label: 'Investors' },
    { href: '#how-it-works', label: 'How It Works' }
  ]
})

const emit = defineEmits<{
  joinClick: []
}>()
</script>

<template>
  <header class="sticky top-0 z-50 glass-effect border-b border-white/10">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
      <div class="flex items-center gap-10">
        <div class="flex items-center gap-2">
          <div class="size-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <Icon name="mdi:lightbulb" class="text-white text-2xl" />
          </div>
          <h1 class="text-xl font-bold tracking-tight text-white">{{ brandName }}</h1>
        </div>
        <nav class="hidden lg:flex items-center gap-8">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-sm font-medium text-slate-200 hover:text-primary transition-colors"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <slot name="actions">
          <button
            type="button"
            class="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20"
            @click="emit('joinClick')"
          >
            Join Now
          </button>
        </slot>
        <button
          type="button"
          class="lg:hidden flex items-center justify-center size-10 rounded-lg hover:bg-white/5 transition-colors"
        >
          <Icon name="mdi:menu" class="text-2xl text-slate-200" />
        </button>
      </div>
    </div>
  </header>
</template>

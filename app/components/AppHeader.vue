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
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#faq', label: 'FAQ' }
  ]
})
</script>

<template>
  <header class="border-b border-gray-200 sticky top-0 bg-white z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold text-sky-600">
        {{ brandName }}
      </div>
      <nav class="hidden md:flex gap-8">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-gray-700 hover:text-sky-600 transition"
        >
          {{ link.label }}
        </a>
      </nav>
      <div class="flex gap-3">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

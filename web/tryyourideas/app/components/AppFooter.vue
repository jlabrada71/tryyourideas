<script setup lang="ts">
interface FooterLink {
  href: string
  label: string
}

withDefaults(defineProps<{
  links?: FooterLink[]
  copyright?: string
}>(), {
  links: () => [
    { href: '#', label: 'Terms' },
    { href: '#', label: 'Privacy' },
    { href: '#', label: 'Contact' }
  ],
  copyright: 'Try Your Ideas © 2024'
})
</script>

<template>
  <footer class="border-t border-white/5 py-12 bg-background-dark/50 mt-20">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
      <div class="flex items-center gap-2">
        <div class="size-7 bg-primary rounded flex items-center justify-center">
          <Icon name="mdi:lightbulb" class="text-white text-lg" />
        </div>
        <span class="font-bold text-slate-400">{{ copyright }}</span>
      </div>
      <div class="flex gap-8 text-sm text-slate-500">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          class="hover:text-primary transition-colors"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink {
  href: string
  label: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  href: string
  label: string
}

withDefaults(defineProps<{
  brandName?: string
  brandDescription?: string
  columns?: FooterColumn[]
  socialLinks?: SocialLink[]
  copyright?: string
}>(), {
  brandName: 'Try Your Ideas',
  brandDescription: 'Transform ideas into reality with the platform for creators, developers, and investors.',
  columns: () => [
    {
      title: 'Product',
      links: [
        { href: '#', label: 'Features' },
        { href: '#', label: 'Pricing' },
        { href: '#', label: 'Security' }
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '#', label: 'About' },
        { href: '#', label: 'Blog' },
        { href: '#', label: 'Contact' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { href: '#', label: 'Privacy' },
        { href: '#', label: 'Terms' },
        { href: '#', label: 'Cookies' }
      ]
    }
  ],
  socialLinks: () => [
    { href: '#', label: 'Twitter' },
    { href: '#', label: 'LinkedIn' },
    { href: '#', label: 'GitHub' }
  ],
  copyright: '© 2026 Try Your Ideas. All rights reserved.'
})
</script>

<template>
  <footer class="bg-gray-900 text-gray-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="text-white font-bold mb-4">{{ brandName }}</h3>
          <p class="text-sm">{{ brandDescription }}</p>
        </div>
        <div v-for="column in columns" :key="column.title">
          <h4 class="text-white font-semibold mb-4">{{ column.title }}</h4>
          <ul class="space-y-2 text-sm">
            <li v-for="link in column.links" :key="link.label">
              <a :href="link.href" class="hover:text-white transition">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 pt-8 flex items-center justify-between">
        <p class="text-sm">{{ copyright }}</p>
        <div class="flex gap-4 text-sm">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            class="hover:text-white transition"
          >
            {{ social.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

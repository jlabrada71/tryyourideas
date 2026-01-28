// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    'nuxt-schema-org',
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      titleTemplate: '%s | Try Your Ideas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#00a8a3' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  site: {
    url: 'https://tryyourideas.com',
    name: 'Try Your Ideas',
  },

  css: [
    '~/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  fonts: {
    families: [
      { name: 'Montserrat', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
    ],
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})
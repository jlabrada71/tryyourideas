// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  alias: {
    "@/lib": "./lib",
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})

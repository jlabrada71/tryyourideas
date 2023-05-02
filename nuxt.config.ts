// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@pinia/nuxt',
  ],
  components: {
    "dirs": [
      "~/components",
      "~/components/selectors"
    ]
  },
  runtimeConfig: {
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    data: '/home/ubuntu/data',
    tmp: '/home/ubuntu/apps/tryyourideas.com/public/tmp',
    public: {
      apiBaseDev: 'http://localhost:3000/api/v1',
      apiBaseProd: 'https://tryyourideas.com/api/v1',
      apiBase: 'https://tryyourideas.com/api/v1',
    }
  },
  routeRules: {
    // Set custom headers matching paths
    '/_nuxt/**': { headers: { 'cache-control': 's-maxage=0' } },
    // Add cors headers
    '/api/v1/**': { cors: true },
    '/analytics/**': { cors: true },
  },
})

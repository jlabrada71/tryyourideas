<template>
  <slot />
</template>

<script setup>
  import { debug, log } from '@/lib/logger.js'

  const config = useRuntimeConfig()
  let isAnalyticsLoaded = false

  function sendAnalytics () {
    if (!process.client) return 
    const url = `${config.public.analyticsServer}/api/v1/analytics`
    const logData = (data) => {
      const newData = { domain: config.public.domain, ...data }
      if (newData.name === 'CLS') {
        newData.entries = []
        // if (data.entries) {
        //   for (const entry of data.entries) {
        //     delete entry.sources
        //   }
        // }
      }
      window.jl && window.jl.sendAnalytics(url, newData)
    }
    // getCLS(logData)
    // getFID(logData)
    // getLCP(logData)

    logData({
    //  userId: getUserId(),
      url: window.location.href
    })
  }

  useHead({
    title: 'Try Your Ideas',
    description: 'Visual Vue Js components Editor. Generates TailwindCSS utility class for VueJS components.',
    meta: [
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'Try Your Ideas'
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: 'https://tryyourideas.com/logo.png'
      }, 
      {
        hid: 'og:description',
        name: 'og:description',
        content: 'Visual Vue Js components Editor. Generates TailwindCSS utility class for VueJS components. The natural and intuitive way to create VueJS components.'
      }, 
      {
        hid: 'og:url',
        name: 'og:url',
        content: 'https://www.tryyourideas.com'
      }
    ],
    script: [
      {
        src: `${config.public.analyticsServer}/analytics/analytics.js`,
        hid: 'analytics',
        type: 'module',
        async: true,
        defer: true,
          // on script load
        callback: () => {
          debug('Analytics Loaded')
          // set('jl_analytics', `${config.public.apiServer}/api/v1/analytics`)
          isAnalyticsLoaded = true
          sendAnalytics()
        }
      },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/intro.js/7.0.1/intro.min.js'}
    ],
    link: [
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/intro.js/7.0.1/introjs.min.css'},
      { rel: 'stylesheet', href: 'https://juanlabrada.com/assets/editor.css'},
    ]
  })

</script>

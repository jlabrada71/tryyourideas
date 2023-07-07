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
      window.jl.sendAnalytics(url, newData)
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
    link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/intro.js/7.0.1/introjs.min.css'}]
  })

</script>

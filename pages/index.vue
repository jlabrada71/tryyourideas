<template>
  <HomeNavigationBar @update:session="updateSession" @update:user="updateUser"/>
  <HomeHero />
</template>
<script setup>
  import { 
    initAccordions, 
    initCarousels, 
    initCollapses, 
    initDials, 
    initDismisses, 
    initDrawers, 
    initDropdowns, 
    initModals, 
    initPopovers, 
    initTabs, 
    initTooltips } from 'flowbite'
  import { useStorage } from '@vueuse/core'

  onMounted(() => {
      initAccordions();
      initCarousels();
      initCollapses();
      initDials();
      initDismisses();
      initDrawers();
      initDropdowns();
      initModals();
      initPopovers();
      initTabs();
      initTooltips();
  })

  const currentUser = useStorage('user', {
    name: 'anonimous',
    email: 'default',
    id: 'undefined',
    licence: 'community',
    maxProjects: '1'
  })

  function updateUser(account) {
    currentUser.value = account
  }

  function updateSession(session) {
    const router = useRouter()
    router.push({
      path: '/editor',
    })
  }
</script>

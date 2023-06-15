<template>
  <HomeSignInForm @update:session="updateSession"></HomeSignInForm>
  <HomeSignUpForm @update:user="updateUser"></HomeSignUpForm>
  <HomeNavigationBar/>
  <HomeHero/>
  <div class="min-h-screen"></div>
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
  import { AccountServiceProxy } from '@/lib/accounts/ServiceProxy'
  import { debug, log } from '@/lib/logger.js'

  const config = useRuntimeConfig()

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
    email: 'unset',
    id: 'undefined',
    licence: 'community',
    maxProjects: '1'
  })

  function updateUser() {
    const router = useRouter()
    router.push({
      path: '/registered',
    })
  }

  async function updateSession(data) {
    debug('SESSION')
    debug(data)
   
    const router = useRouter()
    router.push({
      path: '/editor',
    })
  }
</script>

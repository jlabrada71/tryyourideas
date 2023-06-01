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
  import { AccountRepositoryProxy } from '@/lib/AccountRepositoryProxy'

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
    email: 'default',
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
    console.log('SESSION')
    console.log(data.session)
    const repository = new AccountRepositoryProxy(config)
    const result = await repository.select({ email: data.session.email })
    const account = result.data[0]
    console.log('ACCOUNT')
    console.log(account)
    currentUser.value = account
    const router = useRouter()
    router.push({
      path: '/editor',
    })
  }
</script>

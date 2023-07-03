<template>
  <HomeSignInForm @update:session="updateSession"></HomeSignInForm>
  <HomeSignUpForm @update:user="updateUser"></HomeSignUpForm>
  <HomeNavigationBar/>
  <HomeHero/>
  <div class="h-96"></div>
  <div class="h-96"></div>
  <ApplicationFooter></ApplicationFooter>
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

  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')

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

  async function getLoggedUserData(accessToken) {
    debug('getLoggedUserData')
    const accountService = new AccountServiceProxy(config)
    const response = await accountService.findForAccessToken(accessToken)
    debug(response.data.data )
    currentUser.value = response.data.data
  }

  async function updateSession(data) {
    debug('SESSION')
    debug(data)
    accessToken.value = data.accessToken
    refreshToken.value = data.refreshToken
    nextTick(async () => {
      await getLoggedUserData(accessToken.value)
   
      const router = useRouter()
      router.push({
        path: '/editor',
      })
    })
  }
</script>

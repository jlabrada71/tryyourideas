<template>
  <HomeSignInForm @update:session="updateSession"></HomeSignInForm>
  <HomeSignUpForm @update:user="updateUser"></HomeSignUpForm>
  <HomeNavigationBar @sign-in="signIn" @sign-up="signUp"/>
  <HomeHero @sign-up="signUp"/>
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
  import { AccountRepositoryProxy } from '@/lib/accounts/RepositoryProxy'

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
    console.log('SESSION')
    console.log(data.session)
    const repository = new AccountRepositoryProxy(config)
    const result = await repository.select({ email: data.session.email })
    const account = result.data[0]
    currentUser.value = account
    const router = useRouter()
    router.push({
      path: '/editor',
    })
  }

  function signIn() {
    alert('sign in')

  }

  function signUp() {
    alert('sign-up')
  }
</script>

<template>
  <HomeSignInForm @update:session="updateSession"></HomeSignInForm>
  <HomeSignUpForm @update:user="updateUser"></HomeSignUpForm>
  <HomeNavigationBar/>
  <HomeHero/>
  <div class="flex justify-center w-full">
    <div class="p-10 gap-10 m-10 w-4/5 flex flex-col content-center">
      <div class="flex justify-around gap-10 p-10 m-10 bg-slate-600">
        <img class="w-1/2" src="/assets/images/create-visually.png" alt="Create your components Visually">
        <div class="w-1/2">
          <p class="text-5xl text-slate-50 font-bold">Create your components in the way you wanted</p>
          <p class="text-2xl text-slate-50 m-10">Why struggling remembering CSS codes when you can focus on your design?</p>
          <p class="text-2xl text-slate-50 m-10">Why make silly mistakes when boilerplate code can be easily generate?</p>
        </div>
        
      </div>
      <div class="flex justify-around gap-10 p-10 m-10  bg-slate-100">
        <div class="w-1/2">
          <p class="text-5xl font-bold">Then, write the logic in your favorite IDE</p>
          <p class="text-2xl m-10">Why not use your IDE for what it is good for? Writing code, tests, logic, things that can not be visually validated</p>
          <p class="text-2xl m-10">We generate the code for your favorites frontend frameworks VueJS and TailwindCSS</p>
        </div>
        <img class="w-1/2" src="/assets/images/edit-in-ide.png" alt="Then edit in your favorite ide">
      </div>

      <div class="flex justify-around gap-10 p-10 m-10  bg-slate-100">
        <div class="w-1/4 bg-slate-200">
          <img  class="h-1/4 w-full" src="/assets/images/gradient.png" alt="Gradient Image">
          <p class="text-4xl mx-10 my-5 font-bold">Gradients</p>
          <p class="text-2xl m-10">Finding the right color combination and directions for gradients is quite time consuming. With our component editor it can be done in two mouse clicks.</p>
          <p class="text-2xl m-10"></p>
        </div>
        <div class="w-1/4 bg-slate-200">
          <img  class="h-1/4 w-full"  src="/assets/images/animations.png" alt="Animations image">
          <p class="text-4xl mx-10 my-5 font-bold">Animations</p>
          <p class="text-2xl m-10">When you are giving life to your components, your expectation is to see how this is accomplish and quickly perfect the animation. That is what we allow with our tool. Shadows, gradients, placements and many other animations.</p>
          <p class="text-2xl m-10"></p>
        </div>
        <div class="w-1/4 bg-slate-200">
          <img class="h-1/4 w-full" src="/assets/images/composition.png" alt="Composition image">
          <p class="text-4xl mx-10 my-5 font-bold">Composition</p>
          <p class="text-2xl m-10">There are out there many tools that offer individual components that you need to struggle with to incorporate to your design. We allow component composition in a natural way. With no hassle.</p>
          <p class="text-2xl m-10"></p>
        </div>
        <div class="w-1/4 bg-slate-200">
          <img class="h-1/4 w-full" src="/assets/images/properties.png" alt="Properties image">
          <p class="text-4xl mx-10 my-5 font-bold">Properties</p>
          <p class="text-2xl m-10">Creating properties, variables and events and orchestrating components is both, time-consuming and error prone. It's also difficult to remember which events are triggered by each component. We take care of that.</p>
          <p class="text-2xl m-10"></p>
        </div>
        
      </div>
    </div>
  </div>
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

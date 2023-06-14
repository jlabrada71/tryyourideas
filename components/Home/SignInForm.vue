<template>
  <div id="signInForm" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div id="id-4" class=" flex flex-row flex-wrap justify-center bg-slate-100 w-80 h-96 rounded-lg ">
      <div id="id-4-1" class=" flex flex-row flex-wrap justify-end bg-inherit w-full h-10 rounded-lg ">
        <button ref="closeElement" id="id-4-1-1" type="button" data-modal-hide="signInForm" class=" flex flex-row bg-inherit w-6 h-6 rounded-full hover:flex hover:flex-row hover:bg-slate-300 ">
          <svg xmlns="http://www.w3.org/2000/svg" id="id-4-1-1-1" class=" flex flex-row bg-inherit w-6 h-6 rounded-full focus:flex focus:flex-row focus:bg-inherit focus:w-6 focus:h-6 hover:flex hover:flex-row hover:bg-inherit hover:w-6 hover:h-6 " viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      </div>
      <!-- Google OAuth -->
      <a :href="getGoogleOAuthUrl(from, googleClientId, '')" class="auth-btn google-auth" target="_blank">        
      </a>
      <!-- GitHub OAuth -->
      <a :href="getGitHubOAuthUrl(from, githubClientId, '')"
        target="_self"
        class=" flex flex-row gap-3 justify-center items-center mx-6 bg-slate-200 w-10/12 h-10 rounded-lg border-4 border-slate-500 transition-all  hover:bg-slate-200  hover:border-slate-500 hover:translate-y-1 ">   
        <img :src="GitHubLogo" class="h-8" alt="GitHub Logo" />
        <span id="id-4-2-2" class=" flex flex-row bg-slate-200 w-auto h-6 text-xs font-semibold ">
            Sign In with Github
        </span>
      </a>
      <!-- <button id="id-4-2" type="button" class=" flex flex-row gap-3 justify-center items-center mx-6 bg-slate-200 w-10/12 h-10 rounded-lg border-4 border-slate-500 transition-all hover:bg-slate-200  hover:border-slate-500 hover:translate-y-1 ">
        <img :src="GoogleLogo" class="h-8" alt="Google Logo" />
        <span id="id-4-2-2" class=" flex flex-row bg-slate-200 w-auto h-6 text-xs font-semibold ">
          Sign In with Google
        </span>
      </button> -->
      <span id="id-4-3" class=" block flex-row bg-inherit w-full h-6 text-center ">
          or
      </span>
      <input 
        id="id-4-4-1" 
        type="email" 
        v-model="form.email" 
        class=" flex flex-row bg-slate-200 w-10/12 h-9 rounded-lg border-4 border-teal-400 " 
        placeholder="email">
      <input 
        id="id-4-5-1" 
        type="password" 
        v-model="form.password" 
        class=" flex flex-row bg-slate-200 w-10/12 h-9 rounded-lg border-4 border-teal-400 " 
        placeholder="password">
      <span class=" flex flex-row bg-slate-200 px-2 text-red-600 w-10/12 h-auto " >{{error}}</span>
      <button 
        id="id-4-7" 
        type="button" 
        @click="checkCredentials"
        :disabled="waiting"
        class=" flex flex-row justify-center content-center items-center bg-slate-800 w-10/12 h-10 rounded-lg text-slate-200 transition-all hover:flex hover:flex-row hover:justify-center hover:content-center hover:items-center hover:bg-slate-800 hover:w-10/12 hover:h-10 hover:rounded-lg hover:text-slate-200 hover:transition-all hover:translate-y-1 ">
        <span id="id-4-7-1" class=" flex flex-row bg-inherit h-6 rounded-lg font-bold ">
          <h2 v-if="waiting">Waiting...</h2> <h2 v-else>Sign In  </h2>
        </span>
      </button>
    </div>
    
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { AccountRepositoryProxy } from '@/lib/accounts/RepositoryProxy'
  import GoogleLogo from '@/assets/svg/google.svg'
  import GitHubLogo from '@/assets/svg/github.svg'
  import { getGoogleOAuthUrl, getGitHubOAuthUrl } from '@/lib/url-utils'

  const config = useRuntimeConfig()

  const githubClientId = config.public.githubOAuthClientId
  const googleClientId = config.public.googleClientId
  const from = '/'
  const emit = defineEmits(['update:session'])

  const closeElement = ref(null)

  const form = ref( {
      email: '',
      password: ''
    })

  const error = ref('')
  const waiting = ref(false)

  function cleanForm() {
    form.value = {
      email: '',
      password: ''
    }
  }

  onMounted(() => {
    cleanForm()
  })

  function isValidForm() {
    return true
  }

  function keepFormOpened() {

  }

  function showErrors() {

  }

  async function checkCredentials() {
    error.value = ''
    if (!isValidForm() ) {
      keepFormOpened()
      showErrors()
      return
    }
    const repository = new AccountRepositoryProxy(config)
    waiting.value = true
    const result = await repository.login(form.value)

    waiting.value = false
    if (result.status !== 200) {
      error.value = result.statusText
      keepFormOpened()
      showErrors()
      return
    }
    if (result.data.result == 'error') {
      error.value = result.data.msg
      keepFormOpened()
      showErrors()
      return
    }

    emit('update:session', result.data)
    cleanForm()
    
    closeElement.value.click()
  }

</script>
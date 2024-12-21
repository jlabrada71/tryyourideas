<template>
  <div id="signUpForm" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div id="id-4" class="flex flex-row flex-wrap gap-2 justify-center bg-slate-100 w-80 h-auto rounded-lg ">
        <div id="id-4-2" class=" flex flex-row flex-wrap justify-end bg-inherit w-full h-10 rounded-lg ">
            <button id="id-4-2-1"  ref="closeElement" data-modal-hide="signUpForm"  type="button" class=" flex flex-row bg-inherit w-6 h-6 rounded-full hover:flex hover:flex-row hover:bg-slate-300 ">
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
        class=" flex flex-row gap-3 justify-center items-center mx-6 bg-slate-200 w-full h-10 rounded-lg border-4 border-slate-500 transition-all  hover:bg-slate-200  hover:border-slate-500 hover:translate-y-1 ">   
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
      <span id="id-4-3" class=" bg-inherit w-full h-6 text-center ">
          or
      </span>
      <input id="id-4-4" 
              v-model="form.name" 
              type="text" 
              class=" flex flex-row w-10/12 bg-slate-200 h-9 px-2 rounded-lg border-4 border-teal-400 " 
              placeholder=" name">
      <input id="id-4-4-1" 
              v-model="form.email" 
              type="email" 
              class=" flex flex-row w-10/12 bg-slate-200 h-9  px-2 rounded-lg border-4 border-teal-400 " 
              placeholder=" email">
      <input  id="id-4-5" 
              type="password" 
              v-model="form.password"
              class=" flex flex-row w-10/12 bg-slate-200 h-9  px-2 rounded-lg border-4 border-teal-400 " 
              placeholder=" password">
      <input id="id-4-repeat" 
              type="password" 
              v-model="form.confirmPassword"
              class=" flex flex-row w-10/12 bg-slate-200 h-9  px-2 rounded-lg border-4 border-teal-400 " 
              placeholder="confirm password">
      <div id="id-4-6" class=" flex flex-row w-10/12 gap-2 bg-inherit h-6 ">
          <input id="id-4-6-1" 
              type="checkbox"
              v-model="form.mailing"
              class=" flex flex-row bg-slate-200 w-4 h-4 ">
          <span id="id-4-6-2" class=" flex flex-row bg-inherit h-6 text-xs ">
            I agree to join TYI's mailing list
          </span>
      </div>
      <div class=" flex flex-col w-10/12 my-4 p-4 text-red-600 bg-slate-200 h-auto text-sm ">
        <span v-for="error in errors" id="id-4-8" class="w-full my-1 ">
          {{error}}
        </span>
      </div>
      
      <button id="id-4-7" type="button" @click="sendForm" class=" flex flex-row w-10/12 justify-center content-center items-center bg-slate-800  h-10 rounded-lg text-slate-200 transition-all hover:flex hover:flex-row hover:justify-center hover:content-center hover:items-center hover:bg-slate-800 hover:text-slate-200 hover:transition-all hover:translate-y-1 ">
        Create account
      </button>
      <span id="id-4-8" class=" flex flex-row my-4 w-10/12 mx-6 bg-slate-200 h-10 text-xs ">
          By clicking "Create account" or "Continue with Google", you agree to the TYI TOS and Privacy Policy.
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { AccountServiceProxy } from '@/lib/accounts/ServiceProxy'
import GoogleLogo from '@/assets/svg/google.svg'
import GitHubLogo from '@/assets/svg/github.svg'
import { getGoogleOAuthUrl, getGitHubOAuthUrl } from '@/lib/url-utils'

const emit = defineEmits(['update:user'])

const config = useRuntimeConfig()

const githubClientId = config.public.githubOAuthClientId
const googleClientId = config.public.googleClientId
const from = '/'

const form = ref({
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  mailing: true
})

const errors = ref([])

const closeElement = ref(null)

function isValidForm() {
  const password = form.value.password.trim()
  const name = form.value.name.trim()
  const email = form.value.email.trim()

  if( password !== form.value.password || password.indexOf(' ') > -1) {
    errors.value.push('Password can not contain spaces')
  }

  if (password.length < 8) {
    errors.value.push('Minimum password length 8 chars')
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.push('Password and confirm password must be equal')
  }

  if (name.length === 0) {
    errors.value.push('Name must not be empty')
  }

  if (email.length === 0) {
    errors.value.push('Email must not be empty')
  }

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email.match(validRegex)) {
    errors.value.push('Invalid email address')
  }

  form.value.password = password
  form.value.name = name
  form.value.email = email

  return errors.value.length === 0
}

function keepFormOpened() {

}

function showErrors() {

}

async function sendForm() {
  errors.value = []
  if (!isValidForm() ) {
    keepFormOpened()
    showErrors()
    return
  }
  
  const service = new AccountServiceProxy(config)
  const result = await service.insert(form.value)
  if (result.status !== 200 || result.data.result == 'error') {
    keepFormOpened()
    showErrors()
    errors.value.push(result.data.msg)
    return
  }
  emit('update:user', form.value)
  form.value.name = ''
  form.value.email = ''
  form.value.password = '',
  form.value.confirmPassword = '',
  form.value.mailing = true
  closeElement.value.click()
}

</script>
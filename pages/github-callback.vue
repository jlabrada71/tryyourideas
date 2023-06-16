<template>
  <p>
    Redirecting to Editor
  </p>
  <p>{{accessToken}}</p>
</template>

<script setup>
  import axios from 'axios'
  import { AccountServiceProxy } from '@/lib/accounts/ServiceProxy.js'
  import { useStorage } from '@vueuse/core'
  import { log, debug } from '@/lib/logger.js'

  const code = ref(null)
  
  const config = useRuntimeConfig()
  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')
  const loggedIn = useCookie('logged_in')

  const currentUser = useStorage('user', {
    name: 'anonimous',
    email: 'undefined',
    id: 'undefined',
    licence: 'community',
    maxProjects: '1'
  })

  async function getLoggedUserData() {
    const accountService = new AccountServiceProxy(config)
    const response = await accountService.findForAccessToken(accessToken.value)
    debug(response.data.data )
    currentUser.value = response.data.data
  }

  onMounted(async () => {
    if (loggedIn.value == true ) {
      const router = useRouter()
      router.push({
        path: '/editor',
      })
    }
    const route = useRoute();
    code.value = route.query.code
    if (route.query.code) {
      try {
        const router = useRouter()
        const response = await axios.get(`${config.public.apiBase}/sessions/oauth/github?code=${route.query.code}&path=editor` )
        if (response.status == 200 && response.data.result == 'ok' ) {
          await getLoggedUserData()
          router.push({
            path: response.data.path,
          })
        } else {
          router.push({
            path: response.data.path,
          })
        }
      }
      catch(error) {
        // handle error
        log(error);
      }
      finally  {
        // always executed
      }
    }
  })
</script>
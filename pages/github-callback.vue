<template>
  <p>
    Redirecting to Editor
  </p>
</template>

<script setup>
  import axios from 'axios'

  const code = ref(null)
  
  const config = useRuntimeConfig()
  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')
  const loggedIn = useCookie('logged_in')

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
        console.log(error);
      }
      finally  {
        // always executed
      }
    }
  })
</script>
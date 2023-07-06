<template>
  <p>
    Redirecting to Editor
  </p>
  <p>{{status}}</p>
</template>

<script setup>
  import axios from 'axios'
  import { AccountServiceProxy } from '@/lib/accounts/ServiceProxy.js'
  import { ProjectServiceProxy } from '@/lib/projects/ServiceProxy.js'
  import { useStorage } from '@vueuse/core'
  import { log, debug } from '@/lib/logger.js'

  const code = ref(null)
  
  const config = useRuntimeConfig()
  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')
  const status = ref('')

  const currentUser = useStorage('user', {
    name: 'anonimous',
    email: 'undefined',
    id: 'undefined',
    licence: 'community',
    maxProjects: '1'
  })

  const currentProject = useStorage('currentProject', {
    name: 'Default',
    dirty: false,
    components: [],
  })

  const projectService = new ProjectServiceProxy(config)

  async function getDefaultProject(userId) {
    const  { data } = await projectService.select({ userId, name: 'Default' })
    debug(data)
    if (data.result !== 'ok' ) return
    currentProject.value = data.project
  }

  async function getLoggedUserData() {
    debug('getLoggedUserData')
    const accountService = new AccountServiceProxy(config)
    const response = await accountService.findForAccessToken(accessToken.value)
    debug(response.data.data )
    currentUser.value = response.data.data
    currentProject.value = {
      name: 'Default',
      dirty: false,
      components: [],
    }
  }

  onMounted(async () => {
    const route = useRoute();
    const router = useRouter()
    code.value = route.query.code
    if (route.query.code) {
      try {
        status.value = 'getting github authentication info...'
        nextTick(async () => {
          const response = await axios.get(`${config.public.apiBase}/sessions/oauth/github?code=${route.query.code}&path=editor` )
          if (response.status == 200 && response.data.result == 'ok' ) {
            accessToken.value = response.data.accessToken
            status.value = 'getting logged user data....'
            nextTick(async () => {
              await getLoggedUserData()
              await getDefaultProject(currentUser.value.id)
              router.push({
                path: response.data.path,
              }) 
            })
          } else {
            router.push({
              path: response.data.path,
            })
          }
        })
      }
      catch(error) {
        // handle error
        log(error);
      }
      finally  {
        // always executed
      }
    } 
    else {
      router.push({
        path: '/'
      })
    }
  })
</script>
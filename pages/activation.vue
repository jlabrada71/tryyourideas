<template>
  <HomeNavigationBar/>
  <div class="flex w-full h-screen flex-col">
    <AccountActivation :message="message" :result="result"/>
  </div>
  
</template>
<script setup>
  import axios from 'axios'
  const route = useRoute()
  const router = useRouter()

  const config = useRuntimeConfig()

  function getFromServer(url) {
    return axios({
      method: 'get',
      url
    });
  }

  const result = ref('')
  const message = ref('')

  onMounted(async () => {
    const activationUrl = `${config.public.apiBase}/accounts/activation?code=${route.query.code}&email=${route.query.email}`
    const response = await getFromServer(activationUrl)
    result.value = response.data.msg
    if (response.data.status === 'ok') {
      message.value = 'Go to the home page to login in to the app.'
    } else {
      message.value = 'There was an error activating the account.'
    }
  })

  // router.push({
  //   path: '/test',
  //   query: { streamer: twitchStreamer },
  // })

</script>
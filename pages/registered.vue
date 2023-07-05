<template>
  <HomeNavigationBar/>
  <div class="flex w-full h-screen flex-col">
    <AccountActivation :message="message" :result="result"/>
  </div>  
</template>
<script setup>

const result = ref('')
const message = ref('')

onMounted(async () => {
  message.value = 'Account have been registered'
  result.value = 'To activate your account click the link in the activation email that was sent to your email account.'
})

</script>

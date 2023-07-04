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
  result.value = 'Account have been registered'
  message.value = 'To activate your account click on the link of the activation email that was sent to your email account.'
})

</script>

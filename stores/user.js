import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', (to, from) => {

  const config = useRuntimeConfig()

  const user = ref({
    isLoggedIn: false,
    token: null
  })

  const accessToken = useCookie('customer_token')

  if (accessToken.value ) {
    user.token = accessToken.value
    user.isLoggedIn = true
  }

  async function signIn(email, password) {
    { data, error } = await userRepositoryProxy.signIn(email, password)
    const response = data.value
    user.token = response.accessToken
    user.isLoggedIn = true

    return response
  }

  async function signUp(email, password) {
    { data, error } = await userRepositoryProxy.signUp(email, password)
    const response = data.value
    user.token = response.accessToken
    user.isLoggedIn = true

    return response

  }

  function logout() {
    user.isLoggedIn = false
    user.token = null
    const token = useCookie('customer_token')
    token.value = null
    navigateTo('/')
  }

  return { user, signIn, signUp, logout }
})
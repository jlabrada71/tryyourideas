<template>
  <div>
    <ul>
      <li>env: {{config.public.env}}</li>
      <li>api: {{config.public.apiBase}}</li>
    </ul>
    Project: <br>
    Name: {{project.name}} <br>
    User: <br>
    Id: {{ currentUser.id}} <br> <br>
    Name: {{ currentUser.name}} <br> <br>
    accessToken: {{ accessToken }} <br> <br>
    <div class="p-2 flex gap-2">
      <button @click="cleanProject" class="bg-slate-200 p-2">Clean Project</button>
    <button @click="cleanUser"  class="bg-slate-200 p-2">Clean User</button>
    </div>
    
  </div>

</template>
<script setup>
  import { useStorage } from '@vueuse/core'

  const config = useRuntimeConfig()

  const project = useStorage('currentProject', {
    name: 'Default',
    dirty: false,
    components: [],
  })

  const currentUser = useStorage('user', {
    name: 'anonimous',
    email: 'undefined',
    id: 'undefined',
    licence: 'community',
    maxProjects: '1'
  })

  const accessToken = useCookie('access_token')

  function cleanProject() {
    project.value = {
      name: 'Default',
      dirty: false,
      components: [],
    }
  }

  function cleanUser() {
    currentUser.value = {
      name: 'anonimous',
      email: 'undefined',
      id: 'undefined',
      licence: 'community',
      maxProjects: '1'
    }
  }
</script>
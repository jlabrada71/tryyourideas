<template>
  <div>
    <ul>
      <li>env: {{config.public.env}}</li>
      <li>api: {{config.public.apiBase}}</li>
    </ul>
    Project: <br>
    Name: {{project.name}} <br>
    User: <br>
    Name: {{ currentUser.name}} <br> <br>
    <button @click="cleanProject">Clean Project</button>
    <button @click="cleanUser">Clean User</button>
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

  function cleanProject() {
    project.value = null
  }

  function cleanUser() {
    currentUser.value = null
  }
</script>
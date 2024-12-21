<template>
  <div>
    <ul>
      <li>env: {{config.public.env}}</li>
      <li>api: {{config.public.apiBase}}</li>
    </ul>
    Project: <br>
    Name: {{currentProject.name}} <br>
    User: <br>
    Id: {{ currentUser.id}} <br> <br>
    Name: {{ currentUser.name}} <br> <br>
    Email: {{ currentUser.email}} <br> <br>
    accessToken: {{ accessToken }} <br> <br>
    <div class="p-2 flex gap-2">
      <button @click="cleanProject" class="bg-slate-200 p-2">Clean Project</button>
    <button @click="cleanUser"  class="bg-slate-200 p-2">Clean User</button>
    </div>
    
  </div>

</template>
<script setup>

  import { useEditorStorage } from '@/lib/editor/storage.js'

  const config = useRuntimeConfig()

  const { 
    currentUser, 
    currentProject, 
    cleanUser, 
    cleanProject, 
    accessToken, 
    refreshToken 
  } = useEditorStorage()

  onMounted(() => {
    console.log(currentUser.value.name)
  })
</script>
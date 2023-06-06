<template>
  <div>
    <ul>
      <li>env: {{config.public.env}}</li>
      <li>api: {{config.public.apiBase}}</li>
    </ul>
  </div>

</template>
<script setup>
  const config = useRuntimeConfig()
</script>
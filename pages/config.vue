<template>
  <div>
    <ul>
      <li>env: {{config.env}}</li>
      <li>api: {{config.apiBase}}</li>
    </ul>
  </div>

</template>
<script setup>
  const config = useRuntimeConfig()
</script>
<template>
  <div>
    <slot />
  </div>
  <span>&copy; {{ new Date().getFullYear() }} {{config.env}} <version></version></span>
</template>
<script setup>
  const config = useRuntimeConfig()

</script>
<template>
  <footer class="h-20 w-screen p-5 bg-black text-white">
    <span class=" h-full w-full ">&copy; {{ new Date().getFullYear() }} {{config.public.env}} <ProductVersion></ProductVersion></span>
  </footer>
</template>
<script setup>
  const config = useRuntimeConfig()
</script>
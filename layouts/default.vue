<template>
  <div class="flex flex-col min-h-screen">
    <div class="h-full">
      <slot />
    </div>
    <footer>
      <div class="h-20 w-screen p-5 bg-black text-white">
        <span class=" h-full w-full ">&copy; {{ new Date().getFullYear() }} {{config.public.env}} <ProductVersion></ProductVersion></span>
      </div>
    </footer>
  </div>
</template>
<script setup>
  const config = useRuntimeConfig()
</script>
<template>
  <div class="flex flex-col h-screen">
    <div class="h-full">
      <slot />
    </div>
    <footer>
      <div class="h-20 w-screen p-5 bg-black text-white">
        <span class=" h-full w-full ">&copy; {{ new Date().getFullYear() }} {{config.public.env}} <version></version></span>
      </div>
    </footer>
  </div>
</template>
<script setup>
  const config = useRuntimeConfig()

</script>
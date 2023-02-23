<template>
  <nav class="flex align-center gap-4 p-4">
  <NuxtLink to="/default">
      Default layout
  </NuxtLink>
  <h1 class="text-lg text-gray-500">Hellow Nuxt</h1>
  </nav>
  <Products />

  <ShadowSelector @selected="selectedShadow"></ShadowSelector>
  <button :class="buttonClass">
    This is a test
  </button>
  <TodoView></TodoView>
  <SelectorsBackgroundColor v-model:color="backgroundColor"></SelectorsBackgroundColor>
</template>
<script setup>
import { ref, computed } from 'vue'

const shadow = ref('shadow-none')
const backgroundColor = ref('bg-blue-500')

const buttonClass = computed(() => {
return "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " + shadow.value
})

function selectedShadow(value) {
console.log(value)
shadow.value = value

}
</script>
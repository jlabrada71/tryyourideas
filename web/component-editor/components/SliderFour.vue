<template>
  <a href="https://codepen.io/trevanhetzel/pen/rOVrGK">Original</a>
  <div ref="doc">
    <div class="range">
      <input type="range" min="1" max="7" steps="1" value="1">
    </div>
    
    <ul class="range-labels">
      <li class="active selected">Today</li>
      <li>2 days</li>
      <li>3 days</li>
      <li>4 days</li>
      <li>5 days</li>
      <li>6 days</li>
      <li>7 days</li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const doc = ref(null)
  const range = ref(null)
  const rangeV = ref(null)

  onMounted(() => {
      
  })
</script>

<style scoped>

</style>
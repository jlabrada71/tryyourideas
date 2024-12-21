<template>
  <a href="https://css-tricks.com/value-bubbles-for-range-inputs/">Original</a>
  <div ref="doc">
    <div class="range-wrap">
      <input type="range" class="range">
      <output class="bubble"></output>
    </div>
    
    <div class="range-wrap">
      <input type="range" class="range" min="20" max="940">
      <output class="bubble"></output>
    </div>
    
    <div class="range-wrap" style="width: 75%;">
      <input type="range" class="range" min="50" max="60" step="2">
      <output class="bubble"></output>
    </div>
    
    <div class="range-wrap" style="width: 55%;">
      <input type="range" class="range" min="-20" max="20">
      <output class="bubble"></output>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'

  const doc = ref(null)

  onMounted(() => {
    const allRanges = doc.value.querySelectorAll(".range-wrap");
    allRanges.forEach(wrap => {
      const range = wrap.querySelector(".range");
      const bubble = wrap.querySelector(".bubble");

      range.addEventListener("input", () => {
        setBubble(range, bubble);
      });
      setBubble(range, bubble);
    });

    function setBubble(range, bubble) {
      const val = range.value;
      const min = range.min ? range.min : 0;
      const max = range.max ? range.max : 100;
      const newVal = Number(((val - min) * 100) / (max - min));
      bubble.innerHTML = val;

      // Sorta magic numbers based on size of the native UI thumb
      bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
    }
  })
</script>

<style scoped>
.range-wrap {
  position: relative;
  margin: 0 auto 3rem;
}
.range {
  width: 100%;
}
.bubble {
  background: red;
  color: white;
  padding: 4px 12px;
  position: absolute;
  border-radius: 4px;
  left: 50%;
  transform: translateX(-50%);
}
.bubble::after {
  content: "";
  position: absolute;
  width: 2px;
  height: 2px;
  background: red;
  top: -1px;
  left: 50%;
}

body {
  margin: 2rem;
}

</style>
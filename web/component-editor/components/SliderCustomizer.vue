<template>
  <a href="https://codepen.io/trevanhetzel/pen/rOVrGK">Original</a>
  <div ref="doc">
    <div class="range">
      <label for="customizer">This is a label</label>
      <input id="customizer" type="range" min="1" max="7" steps="1" value="1">
      
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
label {
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding-left: 25px;
  margin-right: 15px;
  margin-top: 10px;
  margin-bottom: -10px;
  font-size: 11px;
}

  input[type=range] {
    height: 42px;
    -webkit-appearance: none;
    margin: 0px 0;
    width: 100%;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 9px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 2px 2px 1px #000000;
    background: #20A945;
    border-radius: 8px;
    border: 1px solid #000000;
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: 3px 3px 7px #000000;
    border: 4px solid #000000;
    height: 29px;
    width: 21px;
    border-radius: 11px;
    background: #FFFFFF;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -12.5px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: #20A945;
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: 9px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 2px 2px 1px #000000;
    background: #20A945;
    border-radius: 8px;
    border: 1px solid #000000;
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: 3px 3px 7px #000000;
    border: 4px solid #000000;
    height: 29px;
    width: 21px;
    border-radius: 11px;
    background: #FFFFFF;
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: 9px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    background: #20A945;
    border: 1px solid #000000;
    border-radius: 16px;
    box-shadow: 2px 2px 1px #000000;
  }
  input[type=range]::-ms-fill-upper {
    background: #20A945;
    border: 1px solid #000000;
    border-radius: 16px;
    box-shadow: 2px 2px 1px #000000;
  }
  input[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 3px 3px 7px #000000;
    border: 4px solid #000000;
    height: 29px;
    width: 21px;
    border-radius: 11px;
    background: #FFFFFF;
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: #20A945;
  }
  input[type=range]:focus::-ms-fill-upper {
    background: #20A945;
  }
</style>
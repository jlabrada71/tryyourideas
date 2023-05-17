<template>
  <div class="m-0" 
    @mouseover="setVisible(true)"
    @mouseleave="setVisible(false)">
    <slot></slot>
    
    <input id="steps-range"
          v-if="visible"
          v-model="selected"
          type="range" 
          min="0" :max="len" 
          step="1"
        class="w-full h-1 bg-slate-200 rounded-md appearance-none cursor-pointer dark:bg-slate-700">
     
  </div>
</template>
<script setup>
  import { computed } from 'vue'

  const emit = defineEmits(['update:option'])

  const props = defineProps({
    options:  { type: Array, required: true },
    option: { type: String }
  })

  const visible = ref(false)

  function setVisible(val) {
    visible.value = val
  }

  const len = computed(() => props.options.length - 1)
  const selected = computed({
    get() {
      return props.options.indexOf(props.option)
    },
    set (value) {
      // console.log('setting: ' + props.options[value])
      emit('update:option', props.options[value])
    }
  })
  // const selectedText = computed(() => props.options[selected.value])
 
</script>
<template>
  <label for="steps-range" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{}}</label>
  <input id="steps-range"
          v-model="selected"
          type="range" 
          min="0" :max="len" 
          step="1"
         class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">

   <!-- <p>Option: {{option}}</p>
  <p>{{options[0]}}=={{option}}:{{options[0]==option}}</p>
  <p>{{len}}</p>
  <p>{{selected}}</p>
  <p>{{selectedText}}</p> -->
  
</template>
<script setup>
  import { computed } from 'vue'

  const emit = defineEmits(['update:option'])

  const props = defineProps({
    options:  { type: Array, required: true },
    option: { type: String }
  })

  const len = computed(() => props.options.length - 1)
  const selected = computed({
    get() {
      return props.options.indexOf(props.option)
    },
    set (value) {
      // console.log('setting: ' + props.options[value])
      emit('update:option', props.options[value])
    }
  }
    )
  // const selectedText = computed(() => props.options[selected.value])
 
</script>
<template>
  <div class="m-0">
    <label for="steps-range" class="block text-sm font-medium text-gray-900 dark:text-white">{{}}
      <input id="steps-range"
            v-model="selected"
            type="range" 
            min="0" :max="len" 
            step="1"
          class="w-full h-1 bg-gray-200 rounded-md appearance-none cursor-pointer dark:bg-gray-700">
      </label>
  </div>
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
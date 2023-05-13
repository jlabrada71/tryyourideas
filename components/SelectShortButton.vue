<template>
  <div class="m-0">
    <slot></slot>
    <select id="options" v-model="selected" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option :value="option" v-for="option in props.options">{{option}}</option>
    </select>
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
      return props.options.find(option => option === props.option)
    },
    set (value) {
      // console.log('setting: ' + props.options[value])
      emit('update:option', value)
    }
  })
  // const selectedText = computed(() => props.options[selected.value])
 
</script>
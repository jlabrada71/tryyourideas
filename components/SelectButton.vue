<template>
  <div class="m-0" 
    @mouseover="setVisible(true)"
    @mouseleave="setVisible(false)">
    <slot></slot>
    <div v-if="visible">
      <label for="options" class="block mb-2 text-sm font-medium text-slate-900 dark:text-white">Select an option</label>
      <select id="options" v-model="selected" class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
        <option disabled>Choose a value</option>
        <option :value="option" v-for="option in props.options">{{option}}</option>
      </select>
    </div>
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
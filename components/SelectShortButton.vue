<template>
  <div class="m-0">
    <slot></slot>
    <select id="options" :disabled="props.options.length==0" v-model="selected" class="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500">
      <option :value="option" :selected="isSelected(option, props.option)" v-for="option in props.options">{{option}}</option>
    </select>
  </div>
</template>
<script setup>
  import { computed, onMounted } from 'vue'

  const emit = defineEmits(['update:option'])

  const props = defineProps({
    options:  { type: Array, required: true },
    option: { type: String }
  })

  const visible = ref(false)

  function setVisible(val) {
    visible.value = val
  }

  function isSelected(option, value) {
    return option === value
  }

  onMounted(() => {
  })

  const len = computed(() => props.options.length - 1)
  const selected = computed({
    get() {
      return props.options.find(option => option === props.option)
    },
    set (value) {
      emit('update:option', value)
    }
  })
  // const selectedText = computed(() => props.options[selected.value])
 
</script>
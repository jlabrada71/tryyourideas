<template>
  <div class="h-10">
    <slot></slot>
    <div class="relative">
      <input
        id="id-2"
        type="text" 
        :value="props.option"
        @input="event => filter(event.target.value)"        
        @focus="setVisible"
        @click="setVisible"
        @keyup.enter="event => select(event.target.value)"
        @keydown.esc="event => scape(event.target.value)"
        class="bg-gray-200 w-28 h-8 my-2 rounded-lg border-2 border-slate-400  px-2">
      <ul v-if="isVisible" class="absolute left-0 top-10 bg-white z-50 border-2 px-2 py-1 w-28 h-96 overflow-y-scroll">
        <li v-for="item in selectedItems" :key="item" @click="select(item)" class="cursor-pointer hover:bg-slate-100">
          {{item}}
        </li>
      </ul>
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

  const backupValue = ref(null)

  const isVisible = ref(false)

  function setVisible() {
    isVisible.value = true
  }

  const selectedItems = computed(() => (props.option === 'unset' || props.option.trim() === '') ? props.options : props.options.filter(item => item.includes(props.option)))
  watchEffect(() => {
    if (! backupValue.value) {
      backupValue.value = props.option
    }
  }) 

  function filter(item) {
    setVisible()
    emit('update:option', item)
  }

  function scape() {
    filter(backupValue.value)
    backupValue.value = null
    isVisible.value = false
  }

  function select(item) { 
    if (! props.options.find(option => option === item)) {
      return
    }
    filter(item)
    backupValue.value = null
    isVisible.value = false
  }
  
</script>

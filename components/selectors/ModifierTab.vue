<template>
    <button id="id-1"
        :disabled="props.disabled"
        type="button" 
        ref="target"
        value="" 
        class=" flex flex-row flex-wrap items-center w-auto h-8 px-2 rounded-t-2xl text-sm   
                                  hover:gap-1 hover:bg-slate-300   hover:text-slate-600   
                                 active:gap-1 active:bg-slate-400  active:text-slate-100  
                                  focus:gap-1 focus:bg-slate-600   focus:text-slate-100"
        :class="selectClass"
      >
      <span id="id-1-1"  class="bg-transparent w-auto h-6 active:text-slate-100 focus:text-slate-100 ">
        <slot></slot>
      </span>
      <input id="id-1-2" 
        type="checkbox" 
        class=" flex flex-row bg-slate-300 w-4 h-10 "
        :disabled="props.disabled"
        >
    </button>
  </template>
  <script setup>
    const emit = defineEmits(['selected:modifier'])

    const selectClass = ref('gap-1 bg-slate-200 text-slate-700 font-medium')

    const props = defineProps({
      value: {
        type: String
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
    })
    const target = ref(null)

    function setActive(active) {
      if (active) {
        selectClass.value = 'gap-1 bg-slate-600 text-slate-100 font-medium'
        target.value.focus()
      } else {
        selectClass.value = 'gap-1 bg-slate-200 text-slate-700 font-medium'
      }
      
    }
    onMounted(() => {
      // console.log(`Mounting ${props.value} ${props.active}`)
      setActive(props.active)
    })

    watch(()=> props.active, (newValue, oldValue) => {
      // console.log(`Watching ${props.value} ${props.active} ${newValue} ${oldValue}`)
      setActive(props.active)
    })

    function buttonSelected() {
      emit('selected:modifier', )
    }

  </script>
  
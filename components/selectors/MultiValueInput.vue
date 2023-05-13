<template>
    <div id="multi-margin-id"  class=" flex flex-row flex-wrap content-between bg-gray-100 w-60 h-60 ">
      <div id="multi-margin-id-1"  class=" flex flex-col justify-stretch items-center bg-slate-100 w-full h-20 ">
        <div id="multi-margin-id-1-1"  class=" block flex-row bg-stone-50 w-8 h-8 p-1.5 font-semibold text-center ">
        {{names[0]}}
        </div>
        <input
          id="multi-margin-id-1-2" 
          :value="props.top"
          @input="event => changeValue(names[0], event.target.value) "
          type="text"
          class=" flex flex-row bg-gray-500 w-12 h-8 border-2 text-gray-100 ">
      </div>
      <div id="multi-margin-id-2"  class=" flex flex-row justify-between bg-slate-100 w-full h-10 ">
        <div id="multi-margin-id-2-1"  class=" flex flex-row items-center bg-gray-100 w-20 h-10 ">
        <div id="multi-margin-id-2-1-1"  class=" block flex-row bg-stone-50 w-8 h-8 p-1 font-semibold text-center ">
          {{names[1]}}
        </div>
        <input
          id="multi-margin-id-2-1-2" 
          :disabled="disabledInput[1]"
          @input="event => changeValue(names[1], event.target.value) "
          type="text" 
          class=" flex flex-row bg-gray-500 w-12 h-8 border-2 text-gray-200 ">
      </div>
      <input id="multi-margin-id-2-2" @click="changeInputs" type="button" class=" flex flex-row bg-blue-500 w-10 h-10 rounded-xl hover:flex hover:flex-row hover:bg-blue-600 hover:w-10 hover:h-10 hover:rounded-xl ">
      <div id="multi-margin-id-2-3" class=" flex flex-row items-center bg-gray-100 w-20 h-10 ">
        <input
          id="multi-margin-id-2-3-1"
          :disabled="disabledInput[2]"
          @input="event => changeValue(names[2], event.target.value) "
          type="text"
          class=" flex flex-row bg-gray-500 w-12 h-8 border-2 text-gray-100 ">
        <div id="multi-margin-id-2-3-2"  class=" block flex-row bg-stone-50 w-8 h-8 p-0.5 font-semibold text-center ">
          {{names[2]}}
        </div>
      </div>
      </div>
      <div id="multi-margin-id-3" class=" flex flex-col-reverse items-center bg-slate-100 w-full h-20 ">
        <div id="multi-margin-id-3-1"  class=" block flex-row bg-stone-50 w-8 h-8 p-1 font-semibold text-center ">
          {{names[3]}}
        </div>
        <input
          id="multi-margin-id-3-2" 
          :disabled="disabledInput[3]"
          @input="event => changeValue(names[3], event.target.value) "
          type="text" 
          class=" flex flex-row bg-gray-500 w-12 h-8 border-2 text-gray-100 ">
      </div>
    </div>
  </template>
  <script setup>
    import { ref, onMounted } from 'vue'

    const props = defineProps({
      top: {
        type: String
      },
      left: {
        type: String
      },
      right: {
        type: String
      },
      bottom: {
        type: String
      },
      config: {
        type: Object
      }

    })
    const emit = defineEmits(['update:values'])

    const names = ref([])
    const disabledInput = ref([])

    function setValueSet() {
      names.value = props.config.nameList[count]
      disabledInput.value = props.config.disabledInputList[count]
    }

    onMounted(() => {
      setValueSet()
    })
    
    let count = 0

    function changeInputs() {
      count = (count + 1) % props.config.nameList.length
      setValueSet()
    }

    function changeValue(prop, value) {
      emit('update:values', { prop, value })
    }

  </script>
<template>
    <div id="multi-margin-id"  class=" flex flex-row flex-wrap content-between bg-slate-100 w-80 h-60 ">
      <div id="multi-margin-id-1"  class=" flex flex-col justify-stretch items-center bg-slate-100 w-full h-20 ">
        <div id="multi-margin-id-1-1"  class=" block flex-row bg-stone-50 w-8 h-8 p-1.5 font-semibold text-center ">
        {{names[0]}}
        </div>
        <SelectShortButton 
          id="multi-margin-id-1-2" 
          :disabled="disabledInput[0]"
          class=" flex flex-row bg-slate-500 w-24 h-10 border-2 text-slate-100 "
          :options="currentDataList[0]" 
          :option="props.top" 
          @update:option="value=>changeValue(names[0], value)">
        </SelectShortButton>          
      </div>
      <div id="multi-margin-id-2"  class=" flex flex-row justify-between bg-slate-100 w-full h-10 ">
        <div id="multi-margin-id-2-1"  class=" flex flex-row items-center bg-slate-100 w-28 h-10 ">
          <div id="multi-margin-id-2-1-1"  class=" block flex-row bg-stone-50 w-8 h-8 p-1 font-semibold text-center ">
            {{names[1]}}
          </div>
          <div class="w-24">
            <SelectShortButton 
              id="multi-margin-id-2-2" 
              :disabled="disabledInput[1]"
              class=" flex flex-row bg-slate-500 w-24 h-10 border-2 text-slate-100 "
              :options="currentDataList[1]" 
              :option="props.left" 
              @update:option="value=>changeValue(names[1], value)">
            </SelectShortButton>   
          </div>
          
        </div>
        <RotateButton id="multi-margin-id-2-2" @click="changeInputs"></RotateButton>
        <div id="multi-margin-id-2-3" class=" flex flex-row items-center bg-slate-100 w-28 h-10 ">
          <div class="w-24">
            <SelectShortButton 
              id="multi-margin-id-2-3-1" 
              :disabled="disabledInput[2]"
              class=" flex flex-row bg-slate-500 w-24 h-10 border-2 text-slate-100 "
              :options="currentDataList[2]" 
              :option="props.right" 
              @update:option="value=>changeValue(names[2], value)">
            </SelectShortButton>   
          </div>
          <div id="multi-margin-id-2-3-2"  class=" block flex-row bg-stone-50 w-8 h-8 p-0.5 font-semibold text-center ">
            {{names[2]}}
          </div>
        </div>
      </div>
      <div id="multi-margin-id-3" class=" flex flex-col-reverse items-center bg-slate-100 w-full h-20 ">
        <div id="multi-margin-id-3-1"  class=" block flex-row bg-stone-50 w-8 h-8 p-1  font-semibold text-center ">
          {{names[3]}}
        </div>
        <SelectShortButton 
          id="multi-margin-id-3-2" 
          :disabled="disabledInput[3]"
          class=" flex flex-row bg-slate-500 w-24 h-10 border-2 text-slate-100 "
          :options="currentDataList[3]" 
          :option="props.bottom" 
          @update:option="value=>changeValue(names[3], value)">
        </SelectShortButton>
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
        type: Object,
        default: {
          nameList: [['','','','']],
          disabledInputList: [[true, true, true, true]],
          dataList: [[[],[],[],[]]],
          start: 0
        }
      }
    })
    const emit = defineEmits(['update:values'])

    const names = ref(['','','',''])
    const disabledInput = ref([true, true, true, true])
    const currentDataList = ref([[],[],[],[]])

    let count = 0

    function setValueSet(count) {
      names.value = props.config.nameList[count]
      disabledInput.value = props.config.disabledInputList[count]
      currentDataList.value = props.config.dataList[count]
    }

    onMounted(() => {
      count = props.config.start
      setValueSet(count)
    })

    function changeInputs() {
      count = (count + 1) % props.config.nameList.length
      setValueSet(count)
    }

    function changeValue(prop, value) {
      const values = { 
        [names.value[0]]: props.top,
        [names.value[1]]: props.left,
        [names.value[2]]: props.right,
        [names.value[3]]: props.bottom,
      }
      console.log('---values')
      console.log(values)
      values[prop] = value
      emit('update:values', values)
    }

  </script>
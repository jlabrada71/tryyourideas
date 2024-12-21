<template>
    <div id="multi-margin-id"  class=" flex flex-row flex-wrap content-between bg-slate-100 w-60 h-60 ">
      <div id="multi-margin-id-1"  class=" flex flex-col justify-stretch items-center bg-slate-100 w-full h-20 ">
        <div id="multi-margin-id-1-1"  class=" block flex-row bg-stone-50 w-8 h-8 p-1.5 font-semibold text-center ">
        {{names[0]}}
        </div>
        <SelectShortButton 
          id="multi-margin-id-1-2" 
          :disabled="disabledInput[0]"
          class=" flex flex-row bg-slate-500 w-16 h-12 border-2 text-slate-100 "
          :options="currentDataList[0]" 
          :option="top" 
          @update:option="value=>changeValue(names[0], value)">
        </SelectShortButton>          
      </div>
      <div id="multi-margin-id-2"  class=" flex flex-row justify-between bg-slate-100 w-full h-12 ">
        <div id="multi-margin-id-2-1"  class=" flex flex-row items-center bg-slate-100 w-28 h-12 ">
          <div id="multi-margin-id-2-1-1"  class=" block flex-row bg-stone-50 w-8 h-8 p-1 font-semibold text-center ">
            {{names[1]}}
          </div>
          <div class="w-16">
            <SelectShortButton 
              id="multi-margin-id-2-2" 
              :disabled="disabledInput[1]"
              class=" flex flex-row bg-slate-500 w-16 h-12 border-2 text-slate-100 "
              :options="currentDataList[1]" 
              :option="left" 
              @update:option="value=>changeValue(names[1], value)">
            </SelectShortButton>   
          </div>
          
        </div>
        <RotateButton id="multi-margin-id-2-2" @click="changeInputs"></RotateButton>
        <div id="multi-margin-id-2-3" class=" flex flex-row items-center bg-slate-100 w-28 h-12 ">
          <div class="w-16">
            <SelectShortButton 
              id="multi-margin-id-2-3-1" 
              :disabled="disabledInput[2]"
              class=" flex flex-row bg-slate-500 w-16 h-12 border-2 text-slate-100 "
              :options="currentDataList[2]" 
              :option="right" 
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
          class=" flex flex-row bg-slate-500 w-16 h-12 border-2 text-slate-100 "
          :options="currentDataList[3]" 
          :option="bottom" 
          @update:option="value=>changeValue(names[3], value)">
        </SelectShortButton>
      </div>
    </div>
  </template>
  <script setup>
    import { ref, onMounted } from 'vue'
    import { removeTag } from '@/lib/ValueUtils'

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
          tagList:[{}],
          start: 0
        }
      }
    })
    const emit = defineEmits(['update:values'])

    const names = ref(['','','',''])
    const disabledInput = ref([true, true, true, true])
    const currentDataList = ref([[],[],[],[]])
    const currentTagList = ref({})

    const top = computed(() => clean(props.top, currentTagList.value[names.value[0]]))
    const left = computed(() => clean(props.left, currentTagList.value[names.value[1]]))
    const right = computed(() => clean(props.right, currentTagList.value[names.value[2]]))
    const bottom = computed(() => clean(props.bottom, currentTagList.value[names.value[3]]))

    function clean(value, tag) {
      return removeTag(value, tag)
    }

    let count = 0

    function setValueSet(count) {
      names.value = props.config.nameList[count]
      disabledInput.value = props.config.disabledInputList[count]
      currentDataList.value = props.config.dataList[count]
      currentTagList.value = props.config.tagList[count]
    }

    onMounted(() => {
      count = props.config.start
      setValueSet(count)
    })

    function changeInputs() {
      count = (count + 1) % props.config.nameList.length
      setValueSet(count)
    }

    function newValue(value, tag) {
      return value === 'unset' ? value : tag + '-' + value
    }

    function changeValue(prop, value) {
      const values = { 
        [names.value[0]]: newValue( top.value, currentTagList.value[names.value[0]] ),
        [names.value[1]]: newValue( left.value, currentTagList.value[names.value[1]] ),
        [names.value[2]]: newValue( right.value, currentTagList.value[names.value[2]]),
        [names.value[3]]: newValue( bottom.value, currentTagList.value[names.value[3]])
      }

      values[prop] = newValue(value, currentTagList.value[prop])
      emit('update:values', values)
    }

  </script>
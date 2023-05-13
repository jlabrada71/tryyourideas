<template>
    <SelectorsMultiValueInput 
      :top="props.top" 
      :left="props.left"
      :right="props.right"
      :bottom="props.bottom"
      :config="{ nameList, disabledInputList }"
      @update:values="values => changeValue(values)"
      ></SelectorsMultiValueInput>
  </template>
  <script setup>
    import { ref } from 'vue'

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
      }

    })
    const emit = defineEmits(['update:values'])

    const nameList = [['T', 'L', 'R', 'B'], ['Y', 'X', '', ''], ['A', '', '', '']]
    const disabledInputList = [[false, false, false, false], [false, false, true, true], [false, true, true, true]]
    let count = 0

    function changeValue(values) {
      emit('update:values', { values })
    }

  </script>
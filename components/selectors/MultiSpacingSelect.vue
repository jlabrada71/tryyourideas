<template>
    <h2>Spacing {{props.top}} {{props.left}} {{props.right}} {{props.bottom}}</h2>
    <SelectorsMultiValueSelect
      :top="props.top" 
      :left="props.left"
      :right="props.right"
      :bottom="props.bottom"
      :config="{ nameList, disabledInputList, dataList, tagList, start }"
      @update:values="values => changeValue(values)"
      ></SelectorsMultiValueSelect>
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

    const nameList = [['Y', 'X', ' ', ' ']]
    const tagList = [{ Y: 'space-y', X: 'space-x' }]
    const disabledInputList = [[false, false, true, true]]
    
    const spacings = ['unset', 'px', 'reverse', '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',  '8', '9','10', '11',  '12','14', '16','20', '24',  '28', '32',  '36', '40', '44', '48',  '52',  '56', '60',  '64', '72', '80',  '96']
    const dataList =   [ [ spacings, spacings, [], []], ]
    let start = 0

    onMounted(() => {
    })

    function changeValue(values) {
      emit('update:values', values)
    }

  </script>
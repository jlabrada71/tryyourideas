<template>
    <h2>Paddings {{props.top}} {{props.left}} {{props.right}} {{props.bottom}}</h2>
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

    const nameList = [['T', 'L', 'R', 'B'], ['Y', 'X', ' ', ' '], ['A', ' ', ' ', ' ']]
    const tagList = [ { T:'pt', L: 'pl', R: 'pr', B: 'pb' }, { Y: 'py', X: 'px' }, { A: 'p' }]
    const disabledInputList = [[false, false, false, false], [false, false, true, true], [false, true, true, true]]
    
    const allList =    ['unset', '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 'auto']
    const xList =      ['unset', '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 'auto']
    const yList =      ['unset', '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 'auto']
    const topList =    ['unset', '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 'auto']
    const rightList =  ['unset', '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 'auto']
    const bottomList = ['unset', '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 'auto']
    const leftList =   ['unset', '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 'auto' ]
    const dataList =   [[topList, leftList, rightList, bottomList], [ yList, xList, [], []], [allList, [], [], [], []]]
    let start = 0

    onMounted(() => {
      if (props.top.startsWith('')) start = 0
      if (props.top.startsWith('py')) start = 1
      if (props.top.startsWith('pt')) start = 2
    })

    function changeValue(values) {
      emit('update:values', values)
    }

  </script>
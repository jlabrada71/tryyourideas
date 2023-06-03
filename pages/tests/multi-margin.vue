<template>
  <SelectorsMultiMarginInput
    :top="top"
    :left="left"
    :right="right"
    :bottom="bottom"
    @update:values="values => updateValues(values) "
    >
  </SelectorsMultiMarginInput>
  <SelectorsMultiMarginSelect
    :top="top"
    :left="left"
    :right="right"
    :bottom="bottom"
    @update:values="values => updateValues(values) "
    >
  </SelectorsMultiMarginSelect>

</template>
<script setup>
  const top = ref('unset')
  const left = ref('unset')
  const right = ref('unset')
  const bottom = ref('unset')

  function updateValues(values) {
    alert('updating values ' + values.prop + ':' + values.value )
    if (values.prop == 'T') {
      top.value = values.value
    }
    if (values.prop == 'L') {
      left.value = values.value
    }
    if (values.prop == 'R') {
      right.value = values.value
    }
    if (values.prop == 'B') {
      bottom.value = values.value
    }
    if (values.prop == 'X') {
      left.value = values.value
      right.value = values.value
    }
    if (values.prop == 'Y') {
      top.value = values.value
      bottom.value = values.value
    }
    if (values.prop == 'A') {
      top.value = values.value
      bottom.value = values.value
      left.value = values.value
      right.value = values.value
    }
  }
</script>
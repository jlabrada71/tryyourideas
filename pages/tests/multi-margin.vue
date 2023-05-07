<template>
  <SelectorsMultiMargin
    :top="top"
    :left="left"
    :right="right"
    :bottom="bottom"
    @update:values="values => updateValues(values) "
    >
  </SelectorsMultiMargin>
</template>
<script setup>
  const top = ref(0)
  const left = ref(0)
  const right = ref(0)
  const bottom = ref(0)

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
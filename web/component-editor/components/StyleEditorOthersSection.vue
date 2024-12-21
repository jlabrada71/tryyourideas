<template>
  <AccordionItem id="99">
    <template #head><span class="flex items-center">Others</span></template>
    <template #body>
      <SelectorsDivideColor :color="cls.divideColor" @update:color="value => updateClass('divideColor', value)"></SelectorsDivideColor>
      <SelectorsOutlineWidth :width="cls.outlineWidth" @update:width="value =>  updateClass('outlineWidth', value)"></SelectorsOutlineWidth>
      <SelectorsOutlineOffset :width="cls.outlineOffset" @update:width="value =>  updateClass('outlineOffset', value)"></SelectorsOutlineOffset>
      <SelectorsOutlineColor :color="cls.outlineColor" @update:color="value => updateClass('outlineColor', value)"></SelectorsOutlineColor>
      <SelectorsRingColor :color="cls.ringColor" @update:color="value => updateClass('ringColor', value)"></SelectorsRingColor>
      <SelectorsFillColor :color="cls.fillColor" @update:color="value => updateClass('fillColor', value)"></SelectorsFillColor>
    </template>
  </AccordionItem>
</template>
<script setup>
  const props = defineProps({
    cls: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['update:cls'])

  function updateClass(name, value) {
    emit('update:cls', { name, value })
  }

</script>
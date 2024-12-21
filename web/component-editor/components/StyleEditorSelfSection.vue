<template>
  <AccordionItem id="26">
    <template #head><span class="flex items-center">Self</span></template>
    <template #body>
      <SelectorsFlexBasis :basis="cls.flexBasis" @update:basis="value => updateClass('flexBasis', value)"></SelectorsFlexBasis>
      <SelectorsFlexShrinkGrow :shrinkGrow="cls.flexShrinkGrow" @update:shrinkGrow="value => updateClass('flexShrinkGrow', value)"></SelectorsFlexShrinkGrow>
      <SelectorsJustifySelf :justify="cls.justifySelf" @update:justify="value => updateClass('justifySelf', value)"></SelectorsJustifySelf>
      <SelectorsAlignSelf :align="cls.alignSelf" @update:align="value => updateClass('alignSelf', value)"></SelectorsAlignSelf>
      <SelectorsPlaceSelf :place="cls.placeSelf" @update:place="value => updateClass('placeSelf', value)"></SelectorsPlaceSelf>
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
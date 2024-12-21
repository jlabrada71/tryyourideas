<template>
  <AccordionItem id="29">
    <template #head><span class="flex items-center">Gradient</span></template>
    <template #body>
      <SelectorsGradientDirection :direction="cls.gradientDirection" @update:direction="value => updateClass('gradientDirection', value)"></SelectorsGradientDirection>
      <SelectorsGradientFromColor :color="cls.gradientFromColor" @update:color="value => updateClass('gradientFromColor', value)"></SelectorsGradientFromColor>
      <SelectorsGradientViaColor :color="cls.gradientViaColor" @update:color="value => updateClass('gradientViaColor', value)"></SelectorsGradientViaColor>
      <SelectorsGradientToColor :color="cls.gradientToColor" @update:color="value => updateClass('gradientToColor', value)"></SelectorsGradientToColor>
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
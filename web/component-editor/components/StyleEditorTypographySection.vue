<template>
  <AccordionItem id="22">
    <template #head><span class="flex items-center">Typography</span></template>
    <template #body>
      <SelectorsTextColor :color="cls.textColor" @update:color="value => updateClass('textColor', value)"></SelectorsTextColor>
      <SelectorsFontSize :size="cls.fontSize" @update:size="value => updateClass('fontSize', value)"></SelectorsFontSize>
      <SelectorsFontFamily :family="cls.fontFamily" @update:family="value => updateClass('fontFamily', value)"></SelectorsFontFamily>
      <SelectorsFontWeight :weight="cls.fontWeight" @update:weight="value => updateClass('fontWeight', value)"></SelectorsFontWeight>
      <SelectorsTextLetterSpacing :spacing="cls.letterSpacing" @update:spacing="value => updateClass('letterSpacing', value)"></SelectorsTextLetterSpacing>
      <SelectorsTextLineHeight :height="cls.lineHeight" @update:height="value => updateClass('lineHeight', value)"></SelectorsTextLineHeight>
      <SelectorsTextAlign :align="cls.textAlign" @update:align="value => updateClass('textAlign', value)"></SelectorsTextAlign>
      <SelectorsTextVerticalAlign :align="cls.textVerticalAlign" @update:align="value => updateClass('textVerticalAlign', value)"></SelectorsTextVerticalAlign>
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
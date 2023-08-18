<template>
  <AccordionItem id="23">
    <template #head><span class="flex items-center">Borders</span></template>
    <template #body>
      <SelectorsBorderRadius :radius="cls.borderRadius"  @update:radius="value => updateClass('borderRadius', value)"></SelectorsBorderRadius>
      <SelectorsBorderWidth  :width="cls.borderWidth" @update:width="value => updateClass('borderWidth', value)"></SelectorsBorderWidth>
      <SelectorsBorderStyle :style="cls.borderStyle" @update:style="value => updateClass('borderStyle', value)"></SelectorsBorderStyle>
      <SelectorsBorderColor :color="cls.borderColor" @update:color="value => updateClass('borderColor', value)"></SelectorsBorderColor>
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
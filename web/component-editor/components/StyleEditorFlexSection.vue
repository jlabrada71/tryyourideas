<template>
  
  <AccordionItem id="25">
    <template #head><span class="flex items-center">Flex</span></template>
    <template #body>
      
      <SelectorsFlexDirection :direction="cls.flexDirection" @update:direction="value => updateClass('flexDirection', value)"></SelectorsFlexDirection>
      <SelectorsFlexWrap :wrap="cls.flexWrap" @update:wrap="value => updateClass('flexWrap', value)"></SelectorsFlexWrap>
      
      <SelectorsGap :gap="cls.gap" @update:gap="value => updateClass('gap', value)"></SelectorsGap>

      <SelectorsJustifyContent :justify="cls.justifyContent" @update:justify="value => updateClass('justifyContent', value)"></SelectorsJustifyContent>
      <SelectorsJustifyItems :justify="cls.justifyItems" @update:justify="value => updateClass('justifyItems', value)"></SelectorsJustifyItems>

      <SelectorsAlignContent :align="cls.alignContent" @update:align="value => updateClass('alignContent', value)"></SelectorsAlignContent>
      <SelectorsAlignItems :align="cls.alignItems" tag="items" @update:align="value => updateClass('alignItems', value)"></SelectorsAlignItems>

      <SelectorsPlaceContent :place="cls.placeContent" @update:place="value => updateClass('placeContent', value)"></SelectorsPlaceContent>
      <SelectorsPlaceItems :place="cls.placeItems" @update:place="value => updateClass('placeItems', value)"></SelectorsPlaceItems>

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
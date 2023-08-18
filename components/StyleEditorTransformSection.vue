<template>
  <AccordionItem id="28">
    <template #head><span class="flex items-center">Transform</span></template>
    <template #body>
      <SelectorsTransformScale :transform="cls.transformScale" @update:transform="value => updateClass('transformScale', value)"></SelectorsTransformScale>
      <SelectorsTransformRotate :transform="cls.transformRotate" @update:transform="value => updateClass('transformRotate', value)"></SelectorsTransformRotate>
      <SelectorsTransformTranslate :transform="cls.transformTranslate" @update:transform="value => updateClass('transformTranslate', value)"></SelectorsTransformTranslate>
      <SelectorsTransformSkew :transform="cls.transformSkew" @update:transform="value => updateClass('transformSkew', value)"></SelectorsTransformSkew>
      <SelectorsTransformOrigin :transform="cls.transformOrigin" @update:transform="value => updateClass('transformOrigin', value)"></SelectorsTransformOrigin>
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
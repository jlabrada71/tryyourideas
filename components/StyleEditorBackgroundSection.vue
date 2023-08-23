<template>
  <AccordionItem id="30">
    <template #head><span class="flex items-center">Background</span></template>
    <template #body>
      <SelectorsBackgroundColor 
        :color="cls.backgroundColor" 
        @update:color="value => updateClass('backgroundColor', value)">
      </SelectorsBackgroundColor>
      <SelectorsBackgroundClip 
        :clip="cls.backgroundClip" 
        @update:clip="value => updateClass('backgroundClip', value)">
      </SelectorsBackgroundClip>
      <SelectorsBackgroundImage 
        :image="cls.backgroundImage" 
        :imageService="props.imageService"
        @update:image="value => updateClass('backgroundImage', value)">
      </SelectorsBackgroundImage>
    </template>
  </AccordionItem>
</template>
<script setup>
  const props = defineProps({
    cls: {
      type: Object,
      required: true
    },
    imageService: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['update:cls'])

  function updateClass(name, value) {
    emit('update:cls', { name, value })
  }

</script>
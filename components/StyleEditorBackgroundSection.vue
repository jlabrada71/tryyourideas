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
      
      <SelectorsBackgroundAttachment 
        :attachment="cls.backgroundAttachment" 
        @update:attachment="value => updateClass('backgroundAttachment', value)">
      </SelectorsBackgroundAttachment>

      <SelectorsBackgroundSize 
        :size="cls.backgroundSize" 
        @update:size="value => updateClass('backgroundSize', value)">
      </SelectorsBackgroundSize>

      <SelectorsBackgroundOrigin 
        :origin="cls.backgroundOrigin" 
        @update:origin="value => updateClass('backgroundOrigin', value)">
      </SelectorsBackgroundOrigin>
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
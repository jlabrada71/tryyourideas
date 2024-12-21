<template>
  <ImageSelectorForm 
    v-if="isSelectingImage" 
    :imageService="props.imageService" 
    @selected:image="selectImage" 
    @cancelled="cancelledSelectImage">
  </ImageSelectorForm>
  <div class="flex w-40">
    <h1 class="m-2 w-28">Image: </h1>
    <div class="flex w-full gap-2">
      <input 
        type="text"
        :value="props.image" 
        class="bg-slate-200 w-20 h-8 rounded-lg border-2 border-slate-400 "
        @input="event => selectImage(event.target.value)">
      <button @click="selectingImage" class=" flex flex-row rounded-full  h-4  hover:bg-slate-300 ">
        <span class=" flex flex-row bg-inherit ">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    image: {
      type: String,
      required: true
    },
    imageService : {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['update:image'])

  const propForImage = ref(null)
  const isSelectingImage = ref(false)

  function selectingImage() {
    isSelectingImage.value = true
  }

  function selectImage(imageUrl) {
    emit('update:image', imageUrl )
    isSelectingImage.value = false
  }

  function cancelledSelectImage() {
    isSelectingImage.value = false
  }

</script>
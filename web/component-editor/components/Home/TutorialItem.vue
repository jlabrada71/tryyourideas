<template>
  <div class="bg-slate-400 w-56 h-56 p-4 rounded-3xl flex-col flex ">
    <a :href="props.url" target="_blank" @update:href="updateUrl" class="bg-unset w-full h-full flex-col flex ">
      <img :src="props.image" @update:src="updateImage" class="bg-slate-300 w-full h-32 rounded-t-xl flex-row flex ">
      <span class=" w-full h-10 rounded-b-xl  font-bold flex-row flex ">
        {{props.title}}
      </span>
    </a>
  </div>
</template>
<script setup>
const props = defineProps({
  image: {
    type: String,
    required: true,
    default: ''
  },

  title: {
    type: String,
    required: true,
    default: ''
  },

  url: {
    type: String,
    required: false,
    default: ''
  }
})
const emit = defineEmits(['update:image', 'update:title', 'update:url'])

function updateImage(value) {
  emit('update:image', value)
}

function updateTitle(value) {
  emit('update:title', value)
}

function updateUrl(value) {
  emit('update:url', value)
}
</script>
<style scoped>

</style>
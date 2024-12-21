<template>
  <ImageSelectorForm v-if="isSelectingImage" :imageService="props.imageService" @selected:image="selectImage" @cancelled="cancelledSelectImage"></ImageSelectorForm>
  <div class="bg-slate-100 flex flex-col gap-2 px-2">
    <div v-for="prop, index in props.item.properties" :key="index" class="flex flex-col">
      <div class="flex flex-row">
        <div class="w-28 flex">
          <div >{{prop.name}}</div>
          <div class="ml-1" v-if="prop.isBinded">bind</div>
        </div>
        <div  class="flex flex-row" v-if="prop.isBinded">
          <select 
            @input="event => bindPropertyToName(prop, event.target.value )"
            class="bg-slate-200 w-28 h-8 rounded-lg border-2 border-slate-400 ">
            <option 
              v-for="bindingOption in bindingOptions" 
              :value="bindingOption.name" 
              :selected="bindingOption.name==prop.bindTo.name">
                {{ bindingOption.name }}
            </option>
          </select>
        </div>
        <div v-else>
          <select 
            v-if="prop.method=='select'" 
            @input="event => updateProperty({...prop, value: event.target.value })"
            class="bg-slate-200 w-28 h-8 rounded-lg border-2 border-slate-400 ">
            <option v-for="val in prop.values" :value="val" :selected="val==prop.value">{{val}}</option>
          </select>
          <div v-else-if="prop.method=='search'" class="flex gap-1 w-28">
            <input 
              type="text"
              :value="prop.value" 
              class="bg-slate-200 w-20 h-8 rounded-lg border-2 border-slate-400 "
              @input="event => updateProperty({...prop, value: event.target.value })">
            <button @click="selectingImage(prop)" class=" flex flex-row rounded-full  h-4  hover:bg-slate-300 ">
              <span class=" flex flex-row bg-inherit ">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
              </span>
            </button>
          </div>
          <input 
            type="text"
            v-else 
            :value="prop.value" 
            class="bg-slate-200 w-28 h-8 rounded-lg border-2 border-slate-400 "
            @input="event => updateProperty({...prop, value: event.target.value })">
          
        </div>

        <CheckButton 
          :value="prop.isBinded"
          class="w-4 ml-1 rounded-lg border-2 border-slate-400"
          @update:value="value => setIsBinded(prop, value)">
        </CheckButton>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { initModals } from 'flowbite'
  import { ref, computed, onMounted, watch } from 'vue'
  import { setIsBinded, bindPropertyTo } from '@/lib/generators/ItemPropertyUtils.js'
  import { replaceUrlParameters } from '@/lib/url-utils.js'
  import { debug, log } from '@/lib/logger.js'
  import _ from 'lodash';   

const { throttle } = _;

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  component: {
    type: Object,
    required: true
  }, 
  imageService: {
    type: Object,
    required: true
  }
})

onMounted(() => {
  initModals();
})

const emit = defineEmits(['update:item'])

const bindingOptions = computed(() => {
  return [{name:'' }].concat(props.component.properties)
})

async function getSvg(url) {
  try {
    const response = await fetch(url)
    if (response.status >= 400 ) {
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>'
    }
    
    const code =  await response.text()
    return code
  } catch(e) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>'
  }
}

const throttledGetSvg = throttle(getSvg, 1000)

function updateItem(item) {
  emit('update:item', item)
}

function bindPropertyToName(prop, name ) {
  const componentProp = bindingOptions.value.find(option => option.name === name)
  bindPropertyTo(prop, componentProp )
}

function updateFetchProperties(item) {
  const fetchProperties = item.properties.filter(prop => prop.method === 'fetch')
  fetchProperties.forEach( async property => {
    property.value = await throttledGetSvg(replaceUrlParameters(item.properties, property.url))
    updateItem(item)
  })
}

const propForImage = ref(null)
const isSelectingImage = ref(false)

function selectingImage(prop) {
  propForImage.value = prop
  isSelectingImage.value = true
  console.log(isSelectingImage.value)
}

function selectImage(imageUrl) {
  if (propForImage.value) {
    propForImage.value.value = imageUrl
  }
  updateProperty(propForImage.value)
  isSelectingImage.value = false
}

function cancelledSelectImage() {
  isSelectingImage.value = false
}

function updateProperty(property) {
  const newItem = {...props.item }
  newItem.properties = props.item.properties.map(prop => prop.name === property.name ? property : prop)
  updateFetchProperties(newItem)
  updateItem(newItem)
}

</script>
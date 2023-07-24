<template>
  <div class="bg-slate-100 flex flex-col gap-2 px-2">
    <div v-for="prop, index in props.item.properties" :key="index" class="flex flex-col">
      <div class="flex flex-row">
        <div class="w-28 flex">
          <div >{{prop.name}}</div>
          <div class="ml-1" v-if="prop.isBinded">bind</div>
        </div>
        <div  class="flex flex-row" v-if="prop.isBinded">
          <select 
            @input="event => bindPropertyTo(prop, event.target.value )"
            class="bg-slate-200 w-28 h-8 rounded-lg border-2 border-slate-400 ">
            <option 
              v-for="componentProp in props.component.properties" 
              :value="componentProp.name" 
              :selected="componentProp.name==prop.bindTo">
                {{ componentProp.name }}
            </option>
          </select>
        </div>
        <div v-else>
          <input 
            type="text"
            v-if="prop.method!='select'" 
            :value="prop.value" 
            class="bg-slate-200 w-28 h-8 rounded-lg border-2 border-slate-400 "
            @input="event => updateProperty({...prop, value: event.target.value })">
          <select 
            v-if="prop.method=='select'" 
            @input="event => updateProperty({...prop, value: event.target.value })"
            class="bg-slate-200 w-28 h-8 rounded-lg border-2 border-slate-400 ">
            <option v-for="val in prop.values" :value="val" :selected="val==prop.value">{{val}}</option>
          </select>
        </div>

        <CheckButton 
          :value="prop.isBinded"
          class="w-4 ml-1 rounded-lg border-2 border-slate-400"
          @update:value="value => isBindedProperty(prop, value)">
        </CheckButton>

      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  import { getReplacedUrl } from '@/lib/PropertyUtils.js'
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
  }
})

const binded = ref([])
const bindedValues = ref([])

const emit = defineEmits(['update:item'])

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

const throttledGetSvg = throttle(getSvg, 3*1000)

function updateItem(item) {
  emit('update:item', item)
}

function updateFetchProperties(item) {
  const fetchProperties = item.properties.filter(prop => prop.method === 'fetch')
  fetchProperties.forEach( async property => {
    property.value = await throttledGetSvg(getReplacedUrl(item.properties, property.url))
    updateItem(item)
  })
}

function updateProperty(property) {
  const newItem = {...props.item }
  newItem.properties = props.item.properties.map(prop => prop.name === property.name ? property : prop)
  updateFetchProperties(newItem)
  updateItem(newItem)
}

function isBindedProperty(property, value) {
  property.isBinded = value
  property.bindTo = ''
}

function bindPropertyTo(property, value) {
  debug(value)
  property.bindTo = value
}

</script>
<template>
  <div id="item-properties-accordion-open" data-accordion="open" class="bg-white">
    <AccordionItem id="11">
      <template #head><span class="flex items-center">General</span></template>
      <template #body>
        <div class="flex flex-col gap-2">
          <SelectorsTagName :type="props.item.type" :typeList="typeList" @update:type="value => updateType(value)"></SelectorsTagName>
          <div>Properties</div>
          <div v-for="prop in props.item.props">
            {{prop.name}}: <input v-if="prop.method!='select'" :value="prop.value" @input="event => updateProperty({...prop, value: event.target.value })">
            <select v-if="prop.method=='select'" @input="event => updateProperty({...prop, value: event.target.value })">
              <option v-for="val in prop.values" :value="val" :selected="val==prop.value">{{val}}</option>
              
            </select>
          </div>

        </div>
      </template>
    </AccordionItem>
  </div>
</template>
<script setup>
  import { ref, computed, onMounted, watch } from 'vue'

  import { 
    initAccordions, 
    initCarousels, 
    initCollapses, 
    initDials, 
    initDismisses, 
    initDrawers, 
    initDropdowns, 
    initModals, 
    initPopovers, 
    initTabs, 
    initTooltips } from 'flowbite'
  import { typeList } from '@/lib/typeList'

// initialize components based on data attribute selectors
onMounted(() => {
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
})

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:item'])

function newProps(props) {
  return props.map(prop => ({ name: prop.name, value: prop.default, type: prop.type, method: prop.method, values: prop.values }))
}

function updateProperty(property) {

  const newItem = {...props.item }
  newItem.props = props.item.props.map(prop => prop.name === property.name ? property : prop)
  console.log("***** updateProperty")
  console.log(newItem)
  emit('update:item', newItem)
}

onMounted(() => {
  console.log(typeList)
})

function updateType(newType) {
  const newItem = {...props.item }
  newItem.type = newType
  const type = typeList.find(type => type.name === newType )
  newItem.props = newProps(type.props)

  emit('update:item', newItem)
}

</script>
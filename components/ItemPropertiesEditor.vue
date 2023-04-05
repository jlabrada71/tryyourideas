<template>
  <div id="item-properties-accordion-open" data-accordion="open" class="bg-white">
    <AccordionItem id="11">
      <template #head><span class="flex items-center">General</span></template>
      <template #body>
        <div class="flex flex-col gap-2">
          <SelectorsTagName :type="props.item.type" :typeList="typeList" @update:type="value => updateType(value)"></SelectorsTagName>
          <div>Properties</div>
          <div v-for="prop in props.item.props">
            {{prop.name}}: <input :value="prop.value" @input="event => updateProperty({name: prop.name, value: event.target.value })">
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

const typeList =  [
  { name: 'template', props: [] }, 
  { name: 'div', props: [] }, 
  { name: 'h1', props: [] }, 
  { name: 'span', props: [] }, 
  { 
    name: 'img', 
    props: [
      { 
        name: 'src',
        type: String,
        default: ''
      }
    ] 
  }, 
  { name: 'section', props: [] }]


function newProps(props) {
  return props.map(prop => ({ name: prop.name, value: prop.default }))
}

function updateProperty(property) {
  const newItem = {...props.item }
  newItem.props = props.item.props.map(prop => prop.name === property.name ? property : prop)

  emit('update:item', newItem)
}

function updateType(newType) {
  if ( props.item.type === newType ) return
  const newItem = {...props.item }
  newItem.type = newType
  const type = typeList.find(type => type.name === newType )
  newItem.props = newProps(type.props)

  emit('update:item', newItem)
}

</script>
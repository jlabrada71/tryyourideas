<template>
  <div class="flex flex-col">
    <span>{{props.item.type}}</span>
    <span>Id: {{props.item.id}}</span>
  </div>
  <div id="accordion-open" data-accordion="open" class="bg-white">
    <AccordionItem id="1">
      <template #head><span class="flex items-center" data-id="itemProperties">Properties</span></template>
      <template #body>
        <ItemPropertiesEditor 
          :item="props.item" 
          :component="props.component" 
          @update:item="item => emit('update:item', item)">
        </ItemPropertiesEditor>
      </template>
    </AccordionItem>

    <AccordionItem id="2">
      <template #head><span class="flex items-center" data-id="itemStyles">Styles</span></template>
      <template #body>
        <ItemStyleEditor :item="props.item" @update:item="item => emit('update:item', item)" @update:modifier="modifier => emit('update:modifier', modifier)"></ItemStyleEditor>
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
  },
  component: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:item', 'update:modifier'])

function updateType(newType) {
  const newItem = {...props.item }
  newItem.type = newType

  emit('update:item', newItem)
}

function updateClass(className, value) {
  const newItem = {...props.item }
  newItem.currentClass[className] = value

  emit('update:item', newItem)
}
</script>
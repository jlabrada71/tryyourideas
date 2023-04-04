<template>
  <div id="item-properties-accordion-open" data-accordion="open" class="bg-white">
    <AccordionItem id="11">
      <template #head><span class="flex items-center">General</span></template>
      <template #body>
        <div class="flex flex-col gap-2">
          <SelectorsTagName :type="props.item.type" @update:type="value => updateType(value)"></SelectorsTagName>
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

const currentClass = computed(() => props.item.currentClass ? props.item.currentClass : props.item.classes[0] )

function updateType(newType) {
  const newItem = {...props.item }
  newItem.type = newType

  emit('update:item', newItem)
}

</script>
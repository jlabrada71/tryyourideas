<template>
  <div id="item-properties-accordion-open" data-accordion="open" class="bg-white">
    <AccordionItem id="11">
      <template #head><span class="flex items-center">General</span></template>
      <template #body>
        <div class="flex flex-col gap-2">
          <span>{{props.item.type}}</span>
          <div class="bg-slate-200">
            <div>Properties</div>
            <div class="bg-slate-100 px-2">
              <div v-for="prop in props.item.props" class="flex flex-row">
                <div class="w-20">{{prop.name}}:</div>
                <input 
                  type="text"
                  v-if="prop.method!='select'" 
                  :value="prop.value" 
                  class="bg-slate-200 w-40 h-8 rounded-lg border-2 border-slate-400 "
                  @input="event => updateProperty({...prop, value: event.target.value })">
                <select 
                  v-if="prop.method=='select'" 
                  @input="event => updateProperty({...prop, value: event.target.value })"
                  class="bg-slate-200 w-40 h-8 rounded-lg border-2 border-slate-400 ">
                  <option v-for="val in prop.values" :value="val" :selected="val==prop.value">{{val}}</option>
                </select>
              </div>
            </div>
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

function updateProperty(property) {

  const newItem = {...props.item }
  newItem.props = props.item.props.map(prop => prop.name === property.name ? property : prop)
  console.log("***** updateProperty")
  console.log(newItem)
  emit('update:item', newItem)
}

</script>
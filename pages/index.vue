<template>
  <div class="w-full h-20 bg-cyan-50 shadow-2xl shadow-slate-600"></div>
  <div class="flex">
    <div class="w-2/12 h-screen bg-slate-50 z-40">
      <TreeItem :item="tree" 
        @update:add-child="addChild" 
        @update:remove="removeItem" 
        @selected="selectItem"/>
      <div class="bg-slate-200 m-5 p-5 h-64">&lt;div class="{{divClass}}"&gt;&lt;/div&gt;</div>
    </div>
    <div class="w-8/12">
      <div class="bg-slate-100 p-10 ">
        <div class="bg-white flex align-middle justify-center h-screen">             
          <TreeItemView :item="tree" @selected="selectItem"></TreeItemView>
        </div>
      </div>
      
    </div>
    <div class="w-2/12 bg-slate-50 px-2 h-auto container">
      <div id="accordion-open" data-accordion="open" class="bg-white">
        <AccordionItem id="1">
          <template #head><span class="flex items-center">General</span></template>
          <template #body>
            <SelectorsBackgroundColor v-model:color="selectedItem.class.backgroundColor"></SelectorsBackgroundColor>
            <SelectorsTextColor v-model:color="textColor"></SelectorsTextColor>
            <SelectorsWidth  v-model:width="selectedItem.class.width"></SelectorsWidth>
            <SelectorsHeight v-model:height="selectedItem.class.height"></SelectorsHeight>
          </template>
        </AccordionItem>

        <AccordionItem id="2">
          <template #head><span class="flex items-center">Typography</span></template>
          <template #body>
          </template>
        </AccordionItem>    

        <AccordionItem id="3">
          <template #head><span class="flex items-center">Borders</span></template>
          <template #body>
            <!-- <SelectorsBorderRadius
              v-model:radius="selectedItem.value.class.borderRadius">
            </SelectorsBorderRadius>
            <SelectorsBorderWidth  
              v-model:width="selectedItem.value.class.borderWidth">
            </SelectorsBorderWidth>
            <SelectorsBorderStyle
              v-model:style="selectedItem.value.class.borderStyle">
            </SelectorsBorderStyle>
            <SelectorsBorderColor
              v-model:color="selectedItem.value.class.borderColor">
            </SelectorsBorderColor> -->
          </template>
        </AccordionItem> 

        <AccordionItem id="4">
          <template #head><span class="flex items-center">Shadows</span></template>
          <template #body>
            <SelectorsShadow v-model:shadow="shadow"></SelectorsShadow>
            <SelectorsShadowColor v-model:color="shadowColor"></SelectorsShadowColor>
          </template>
        </AccordionItem> 
        
        <AccordionItem id="5">
          <template #head><span class="flex items-center">Others</span></template>
          <template #body>
            <SelectorsDivideColor v-model:color="divideColor"></SelectorsDivideColor>
            <SelectorsOutlineColor v-model:color="outlineColor"></SelectorsOutlineColor>
            <SelectorsRingColor v-model:color="ringColor"></SelectorsRingColor>
          </template>
        </AccordionItem>
      </div>
    </div>
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

const textColor = ref('text-white')
const shadow = ref('shadow-none')
const shadowColor = ref('shadow-slate-100')

const divideColor = ref('divide')
const outlineColor = ref('outline')
const ringColor = ref('ring')

const tree = ref({
  id: '1',
  name: 'body',
  children: [],
  renderedClass: 'flex bg-blue-500 w-80 h-80 border-slate-100 border-solid border-2',
  class: {
    backgroundColor: 'bg-blue-500',
    width: 'w-80',
    height: 'h-80',
    borderColor: 'border-slate-100',
    borderStyle: 'border-solid',
    borderWidth: 'border-2',
    borderRadius: 'rounded-none'
  },
  type: 'body'
})

const selectedItem = ref(
  tree.value
//   {
//   id: '1',
//   name: 'body',
//   children: [],
//   renderedClass: 'flex bg-blue-500 w-80 h-80 border-slate-100 border-solid border-2',
//   class: {
//     backgroundColor: 'bg-blue-500',
//     width: 'w-80',
//     height: 'h-80',
//     borderColor: 'border-slate-100',
//     borderStyle: 'border-solid',
//     borderWidth: 'border-2',
//     borderRadius: 'rounded-none'
//   },
//   type: 'body'
// }
)


const divClass = computed(() => {
  return `${selectedItem.value.class.backgroundColor}  ${textColor.value} ${selectedItem.value.class.width} ${selectedItem.value.class.height} 
          ${shadow.value} ${shadowColor.value} 
          ${selectedItem.value.class.borderRadius} ${selectedItem.value.class.borderWidth} ${selectedItem.value.class.borderStyle} ${selectedItem.value.class.borderColor} 
          ${outlineColor.value} 
          ${ringColor.value} 
          ${divideColor.value} 
          ` 
})

watch(divClass, (newClass, oldClass) => {
  selectedItem.value.renderedClass = newClass

})




function removeItemFrom(parent, node) {
  parent.children.forEach((parentNode, i) => {
    if (parentNode.id === node.id) {
      parent.children.splice(i, 1)
      return
    }
    if (node.id.startsWith(parentNode.id)) {
      removeItemFrom(parentNode, node)
    }
  }) 
}

function removeItem(node) {
  if (node.id === '1') return; // root can not be removed
  removeItemFrom(tree.value, node)
}

function addChild(parent) {
  const newItem = {
    id: `${parent.id}-${parent.children.length + 1}`,
    name: 'div',
    type: 'div',
    children: [],
    renderedClass: 'flext bg-blue-500 w-10 h-10 border-slate-100 border-solid border-2',
    class: {
      backgroundColor: 'bg-blue-500',
      width: 'w-10',
      height: 'h-10',
      borderColor: 'border-slate-100',
      borderStyle: 'border-solid',
      borderWidth: 'border-2',
      borderRadius: 'rounded-none',
    }
  }
  parent.children.push(newItem)
}

function selectItem(item) {
  console.log('selected: ' + item.id)
  selectedItem.value.isSelected = false
  selectedItem.value = item
  selectedItem.value.isSelected = true 
}

</script>

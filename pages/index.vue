<template>
  <div class="w-full h-20 bg-cyan-50 shadow-xl shadow-cyan-50 z-40"></div>
  <div class="flex">
    <div class="w-2/12 h-screen bg-slate-50 z-40">
      <div class="bg-slate-600 text-white w-full">Components</div>
      <TreeItem :item="tree" 
        @update:add-child="addChild" 
        @update:remove="removeItem" 
        @selected="selectItem"/>
      <div class="bg-slate-600 text-white w-full mt-10">Code</div>
      <div class="bg-slate-200 m-5 p-5 h-64">&lt;div class="{{divClass}}"&gt;&lt;/div&gt;</div>
      <div class="bg-slate-600 text-white w-full mt-10">Export</div>
      <div class="bg-slate-200 m-5 p-5 h-auto">{{exported}}</div>
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
            <div class="flex flex-col gap-2">
              <span>Id: {{selectedItem.id}}</span>
              <SelectorsHtmlTag v-model:type="selectedItem.type"></SelectorsHtmlTag>
              <div class="flex gap-2"> 
                <label for="text-edit">Text</label>
                <input id="text-edit" class="bg-slate-100 rounded" type="text" v-model="selectedItem.text">
              </div>
             
              <SelectorsBackgroundColor v-model:color="selectedItem.class.backgroundColor"></SelectorsBackgroundColor>
              <SelectorsWidth  v-model:width="selectedItem.class.width"></SelectorsWidth>
              <SelectorsHeight v-model:height="selectedItem.class.height"></SelectorsHeight>
            </div>
            
          </template>
        </AccordionItem>

        <AccordionItem id="2">
          <template #head><span class="flex items-center">Typography</span></template>
          <template #body>
            <SelectorsTextColor v-model:color="selectedItem.class.textColor"></SelectorsTextColor>
            <SelectorsFontSize v-model:size="selectedItem.class.fontSize"></SelectorsFontSize>
            <SelectorsFontFamily v-model:family="selectedItem.class.fontFamily"></SelectorsFontFamily>
            <SelectorsFontWeight v-model:weight="selectedItem.class.fontWeight"></SelectorsFontWeight>
            <SelectorsLetterSpacing v-model:spacing="selectedItem.class.letterSpacing"></SelectorsLetterSpacing>
            <SelectorsLineHeight v-model:height="selectedItem.class.lineHeight"></SelectorsLineHeight>
            <SelectorsTextAlign v-model:align="selectedItem.class.textAlign"></SelectorsTextAlign>
            <SelectorsTextVerticalAlign v-model:align="selectedItem.class.textVerticalAlign"></SelectorsTextVerticalAlign>
          </template>
        </AccordionItem>    

        <AccordionItem id="3">
          <template #head><span class="flex items-center">Borders</span></template>
          <template #body>
            <SelectorsBorderRadius
              v-model:radius="selectedItem.class.borderRadius">
            </SelectorsBorderRadius>
            <SelectorsBorderWidth  
              v-model:width="selectedItem.class.borderWidth">
            </SelectorsBorderWidth>
            <SelectorsBorderStyle
              v-model:style="selectedItem.class.borderStyle">
            </SelectorsBorderStyle>
            <SelectorsBorderColor
              v-model:color="selectedItem.class.borderColor">
            </SelectorsBorderColor>
          </template>
        </AccordionItem> 

        <AccordionItem id="4">
          <template #head><span class="flex items-center">Shadows</span></template>
          <template #body>
            <SelectorsShadow v-model:shadow="selectedItem.class.shadow"></SelectorsShadow>
            <SelectorsShadowColor v-model:color="selectedItem.class.shadowColor"></SelectorsShadowColor>
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

import toHtml from '@/components/HtmlExporter.js'

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



const divideColor = ref('divide')
const outlineColor = ref('outline')
const ringColor = ref('ring')
const defaultItem = {
    name: 'div',
    type: 'div',
    children: [],
    text: '',
    renderedClass: 'flex flex-wrap bg-blue-500 w-10 h-10 border-slate-100 border-solid border-2',
    class: {
      backgroundColor: 'bg-blue-500',
      width: 'w-10',
      height: 'h-10',

      borderColor: 'border-slate-100',
      borderStyle: 'border-solid',
      borderWidth: 'border-2',
      borderRadius: 'rounded-none',

      textColor: 'text-white',
      fontSize: 'text-base',
      fontFamily: 'font-sans',
      fontWeight: 'font-normal',
      letterSpacing: 'tracking-normal',
      lineHeight: 'leading-none',
      textAlign: 'text-left',
      textVerticalAlign: 'align-baseline',

      shadow: 'shadow-none',
      shadowColor: 'shadow-slate-100',
    }
  }

const tree = ref({
  id: '1',
  name: 'root',
  type: 'template',
  children: [],
  text: '',
  renderedClass: 'flex flex-wrap bg-blue-500 w-10 h-10 border-slate-100 border-solid border-2',
  class: {
    backgroundColor: 'bg-blue-500',
    width: 'w-10',
    height: 'h-10',

    borderColor: 'border-slate-100',
    borderStyle: 'border-solid',
    borderWidth: 'border-2',
    borderRadius: 'rounded-none',

    textColor: 'text-white',
    fontSize: 'text-base',
    fontFamily: 'font-sans',
    fontWeight: 'font-normal',
    letterSpacing: 'tracking-normal',
    lineHeight: 'leading-none',
    textAlign: 'text-left',
    textVerticalAlign: 'align-baseline',

    shadow: 'shadow-none',
    shadowColor: 'shadow-slate-100',
  }
})

const selectedItem = ref(tree.value)


const divClass = computed(() => {
  return `${selectedItem.value.class.backgroundColor} ${selectedItem.value.class.width} ${selectedItem.value.class.height} 
          ${selectedItem.value.class.shadow} ${selectedItem.value.class.shadowColor} 
          ${selectedItem.value.class.borderRadius} ${selectedItem.value.class.borderWidth} ${selectedItem.value.class.borderStyle} ${selectedItem.value.class.borderColor}
          ${selectedItem.value.class.textColor} ${selectedItem.value.class.fontSize}  ${selectedItem.value.class.fontWeight} ${selectedItem.value.class.fontFamily} ${selectedItem.value.class.letterSpacing} ${selectedItem.value.class.lineHeight}  ${selectedItem.value.class.textAlign} ${selectedItem.value.class.textVerticalAlign}
          ${outlineColor.value} 
          ${ringColor.value} 
          ${divideColor.value} 
          flex flex-wrap
          ` 
})

const exported = computed(() => toHtml(tree.value))

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
    text: '',
    renderedClass: 'flex flex-wrap bg-blue-500 w-10 h-10 border-slate-100 border-solid border-2',
    class: {
      backgroundColor: 'bg-blue-500',
      width: 'w-10',
      height: 'h-10',

      borderColor: 'border-slate-100',
      borderStyle: 'border-solid',
      borderWidth: 'border-2',
      borderRadius: 'rounded-none',

      textColor: 'text-white',
      fontSize: 'text-base',
      fontFamily: 'font-sans',
      fontWeight: 'font-normal',
      letterSpacing: 'tracking-normal',
      lineHeight: 'leading-none',
      textAlign: 'text-left',
      textVerticalAlign: 'align-baseline',

      shadow: 'shadow-none',
      shadowColor: 'shadow-slate-100',
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

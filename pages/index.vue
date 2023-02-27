<template>
  <div class="w-full h-20 bg-cyan-50 shadow-xl shadow-cyan-50 z-40"></div>
  <div class="flex">
    <div class="w-2/12 h-screen bg-slate-50 z-40">
      <div class="bg-slate-600 text-white w-full">Components</div>
      <TreeItem :item="tree" 
        @update:add-child="addChild" 
        @update:remove="removeItem" 
        @selected="selectItem"/>
      <div class="bg-slate-600 text-white w-full mt-10">Export</div>
      <div class="bg-slate-200 m-5 p-5 h-auto">{{exported}}</div>
    </div>
    <div class="w-8/12">
      <div class="bg-slate-100 p-10 ">

        <!-- Tabs -->

        <div class="border-b border-gray-200 dark:border-gray-700">
          <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <li class="mr-2">
              <a href="#" class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 86.686" enable-background="new 0 0 122.88 86.686" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M53.995,73.994h25.399c0.064,4.396,1.872,8.325,6.783,11.429H47.22 C51.14,82.576,54.013,79.116,53.995,73.994L53.995,73.994L53.995,73.994L53.995,73.994z M41.118,30.451v53.131 c0,1.012-0.829,1.841-1.84,1.841H1.841C0.829,85.423,0,84.594,0,83.582V30.451c0-1.011,0.829-1.84,1.841-1.84h37.432 C40.289,28.611,41.118,29.439,41.118,30.451L41.118,30.451L41.118,30.451z M20.557,79.303c1.164,0,2.11,0.945,2.11,2.109 s-0.946,2.11-2.11,2.11s-2.11-0.946-2.11-2.11C18.452,80.248,19.393,79.303,20.557,79.303L20.557,79.303L20.557,79.303z M38.622,31.895v45.537H2.755V31.895H38.622L38.622,31.895L38.622,31.895z M102.54,44.215h15.942c1.213,0,2.32,0.495,3.109,1.29 c0.8,0.801,1.288,1.902,1.288,3.109v33.673c0,1.214-0.494,2.321-1.288,3.109c-0.802,0.802-1.902,1.289-3.109,1.289H102.54 c-1.214,0-2.321-0.494-3.109-1.289c-0.801-0.8-1.289-1.901-1.289-3.109V48.608c0-1.214,0.494-2.321,1.289-3.11 C100.231,44.698,101.326,44.215,102.54,44.215L102.54,44.215L102.54,44.215z M99.657,80.576h21.701V49.012H99.657V80.576 L99.657,80.576z M110.505,81.952c0.995,0,1.808,0.801,1.808,1.808c0,0.996-0.801,1.809-1.808,1.809 c-0.995,0-1.809-0.801-1.809-1.809C108.696,82.766,109.497,81.952,110.505,81.952L110.505,81.952L110.505,81.952z M17.5,0h97.411 c1.542,0,2.8,1.257,2.8,2.8v31.73h-3.976V6.268c0-1.359-1.11-2.479-2.479-2.479H21.145l0,0c-1.359,0-2.479,1.11-2.479,2.479v16.178 H14.7V2.8C14.7,1.257,15.958,0,17.5,0L17.5,0L17.5,0L17.5,0z M47.03,60.417h45.478v9.713H47.03V60.417L47.03,60.417z"/></g></svg>
                any
              </a>
            </li>
            <li class="mr-2">
                <a href="#" class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                  <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 40 130"  xmlns="http://www.w3.org/2000/svg" ><path class="cls-1" d="M13.33,0H57A13.37,13.37,0,0,1,70.34,13.33v96.22A13.37,13.37,0,0,1,57,122.88H13.33A13.35,13.35,0,0,1,0,109.54V13.33A13.35,13.35,0,0,1,13.33,0ZM35.16,108.37a5.46,5.46,0,1,1-5.45,5.46,5.47,5.47,0,0,1,5.45-5.46Zm31.34-4.19V16.75H3.83v87.43Z"/></svg>
                 
                    sm
                </a>
            </li>
            <li class="mr-2">
                <a href="#" class="inline-flex p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group" aria-current="page">
                  <svg aria-hidden="true" class="w-5 h-5 mr-2 text-blue-600 dark:text-blue-500" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 88.65 122.88" style="enable-background:new 0 0 88.65 122.88" xml:space="preserve"><g><path class="st0" d="M88.65,3.62v115.63c0,1.99-1.63,3.62-3.62,3.62H3.62c-1.99,0-3.62-1.63-3.62-3.62V3.62C0,1.63,1.63,0,3.62,0 h81.4C87.02,0,88.65,1.63,88.65,3.62L88.65,3.62z M44.32,109.86c2.29,0,4.15,1.86,4.15,4.15c0,2.29-1.86,4.15-4.15,4.15 c-2.29,0-4.15-1.86-4.15-4.15C40.18,111.72,42.03,109.86,44.32,109.86L44.32,109.86z M83.74,6.46v98.75H5.42V6.46H83.74L83.74,6.46 z"/></g></svg>
                  
                  md
                </a>
            </li>
            <li class="mr-2">
                <a href="#" class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                  <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 70.51" xml:space="preserve"><g><path class="st0" d="M2.54,65.44h12.59c-0.93-0.24-1.63-1.1-1.63-2.1V2.17C13.5,0.98,14.48,0,15.67,0h90.97 c1.19,0,2.17,0.98,2.17,2.17v61.16c0,1.01-0.69,1.86-1.63,2.1h13.16c1.4,0,2.54,1.14,2.54,2.54v0c0,1.4-1.14,2.54-2.54,2.54H2.54 c-1.4,0-2.54-1.14-2.54-2.54v0C0,66.58,1.14,65.44,2.54,65.44L2.54,65.44z M17.21,3.4h88.19v59.32H17.21V3.4L17.21,3.4z M57.87,66.39h7.14c0.67,0,1.22,0.55,1.22,1.22l0,0c0,0.67-0.55,1.22-1.22,1.22h-7.14c-0.67,0-1.22-0.55-1.22-1.22l0,0 C56.65,66.93,57.2,66.39,57.87,66.39L57.87,66.39z"/></g></svg>
                  lg
                </a>
            </li>
            <li class="mr-2">
                <a href="#" class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                  <svg  aria-hidden="true" class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 101.9"><path class="cls-1" d="M3.34,0h116.2a3.35,3.35,0,0,1,3.34,3.34v77a3.35,3.35,0,0,1-3.34,3.34H3.34A3.35,3.35,0,0,1,0,80.32v-77A3.35,3.35,0,0,1,3.34,0Zm43,88.27h30.3c.08,5.24,2.24,9.94,8.09,13.63H38.2c4.68-3.39,8.11-7.51,8.09-13.63Zm-39-83.5H115.56a3,3,0,0,1,3,3V68a3,3,0,0,1-3,3H7.33a3,3,0,0,1-2.95-3V7.72a3,3,0,0,1,3-2.95Z"/></svg>
                  xl
                </a>
            </li>
            <li class="mr-2">
              <a href="#" class="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <svg aria-hidden="true" class="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 86.79"><path class="cls-1" d="M61.44,14.75A21.93,21.93,0,1,1,39.51,36.68,21.93,21.93,0,0,1,61.44,14.75ZM2.08,0h120.8V73.36H77.57v8.28h7.28v5.15h-47V81.64h7.28V73.36H0V0ZM118.73,4.15H4.15V69.2H118.72v-65ZM69.24,38c1.12-.72,1.11-1.52,0-2.16L57.7,29.24c-.91-.57-1.86-.24-1.83,1l0,13.4c.08,1.29.82,1.64,1.9,1L69.24,38ZM61.44,19.2A17.48,17.48,0,1,1,44,36.68,17.48,17.48,0,0,1,61.44,19.2Z"/></svg>
                2xl
              </a>
            </li>
             
          </ul>
        </div>

        <!-- Tabs -->

        <!-- Component view -->

        <div class="bg-white flex align-middle justify-center h-screen">             
          <TreeItemView :item="tree" @selected="selectItem"></TreeItemView>
        </div>
         <!-- Component view -->
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
              <SelectorsPadding v-model:padding="selectedItem.class.padding"></SelectorsPadding>
              <SelectorsMargin v-model:margin="selectedItem.class.margin"></SelectorsMargin>
              <SelectorsSpacing v-model:spacing="selectedItem.class.spacing"></SelectorsSpacing>
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
      padding: 'p-0',
      margin: 'm-0',
      spacing: 'space-x-0',

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
    padding: 'p-0',
    margin: 'm-0',
    spacing: 'space-x-0',

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
  return `${selectedItem.value.class.backgroundColor} ${selectedItem.value.class.width} ${selectedItem.value.class.height} ${selectedItem.value.class.padding} ${selectedItem.value.class.margin}  ${selectedItem.value.class.spacing}
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
      padding: 'p-0',
      margin: 'm-0',
      spacing: 'space-x-0',

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
  selectItem(newItem)
}

function selectItem(item) {
  console.log('selected: ' + item.id)
  selectedItem.value.isSelected = false
  selectedItem.value = item
  selectedItem.value.isSelected = true 
}

</script>

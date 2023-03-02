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
      <div class="bg-slate-600 text-white w-full mt-10">Rendered class</div>
      <div>
        {{selectedItem.renderedClass}}
      </div>
      <div class="bg-slate-600 text-white w-full mt-10">Rendered class</div>
      
      <div>
        {{currentItemClass}}
      </div>
    </div>
    
    <div class="w-8/12">
      <div class="bg-slate-100 p-10 ">
        <SelectorsDevice @update:device="changeDevice"></SelectorsDevice>

        <!-- Component view -->

        <div class="bg-white flex align-middle justify-center h-screen">             
          <TreeItemView :item="tree" @selected="selectItem"></TreeItemView>
        </div>
         <!-- Component view -->
      </div>
      
    </div>
    <div class="w-2/12 bg-slate-50 px-2 h-auto container">
      <PropertyEditor :item="selectedItem" @update:item="updateItem" @add:modifier="selectModifier"></PropertyEditor>    
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
    editorClass: 'flex flex-wrap bg-blue-500 w-10 h-10 border-slate-100 border-solid border-2',
    renderedClass: 'flex flex-wrap bg-blue-500 w-10 h-10 border-slate-100 border-solid border-2',
    classes: [],
    class: {
      device: '',
      mode: '',
      modifier: '',

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

      divideColor: 'divide-blue-50',
      outlineColor: 'outline-blue-50',
      ringColor: 'ring-blue-50',
    }
  }

const tree = ref({
  id: '1',
  name: 'root',
  type: 'template',
  children: [],
  text: '',
  editorClass: 'flex flex-wrap bg-blue-500 w-10 h-10 border-slate-100 border-solid border-2',
  renderedClass: 'flex flex-wrap bg-blue-500 w-10 h-10 border-slate-100 border-solid border-2',
  classes: [],
  class: {
    device: '',
    mode: '',
    modifier: '',

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

    divideColor: 'divide-blue-50',
    outlineColor: 'outline-blue-50',
    ringColor: 'ring-blue-50',
  }
})


onMounted(() => {
  defaultItem.classes.push(defaultItem.class)
  tree.value.classes.push(tree.value.class)
})

const selectedItem = ref(tree.value)

const currentItemClass = ref(selectedItem.value.renderedClass)


const exported = computed(() => toHtml(tree.value))

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

function updateItem(newValue) {
  // console.log('******** Updating item: ')
  // console.log(newValue.id)
  // console.log(newValue.class.backgroundColor)
  // console.log(newValue.renderedClass)
  selectedItem.value.id = newValue.id
  selectedItem.value.class = newValue.class
  selectedItem.value.renderedClass = newValue.renderedClass
  selectedItem.value.editorClass = newValue.editorClass
  selectedItem.value.classes = newValue.classes
  currentItemClass.value = newValue.renderedClass
}

function removeItem(node) {
  if (node.id === '1') return; // root can not be removed
  removeItemFrom(tree.value, node)
}

function clone(item) {
  return JSON.parse(JSON.stringify(item))
}

function addChild(parent) {
  const newItem = clone(defaultItem)
  
  newItem.id = `${parent.id}-${parent.children.length + 1}`,
  parent.children.push(newItem)
  selectItem(newItem)
}

function selectItem(item) {
  console.log('selected: ' + item.id)
  selectedItem.value.isSelected = false
  selectedItem.value = item
  selectedItem.value.isSelected = true 
}

function findOrCreateClassBy(device, mode, modifier) {
  if (selectedItem.value.classes.lenght === 0 ) {  // if the classes list is empty add current class.
    selectedItem.value.classes.push(selectedItem.value.class)
  }
  const result = selectedItem.value.classes.find((item) => item.device === device && item.mode === mode && item.modifier === modifier)
  if (result) return result;
  const resultClass = clone(defaultItem.class)
  resultClass.mode = mode
  resultClass.device = device
  resultClass.modifier = modifier
  selectedItem.value.classes.push(resultClass)
  return resultClass
}

function changeDevice(device) {
  console.log('selecting device: ' + device)
  const newDevice = device === 'any' ? '' : device + ':'
  selectedItem.value.class  = findOrCreateClassBy(newDevice, selectedItem.value.class.mode, selectedItem.value.class.modifier)
}

function selectModifier(modifier) {
  console.log('adding modifier ' + modifier)
  const newModifier = modifier === 'default' ? '' : modifier + ':'
  selectedItem.value.class  = findOrCreateClassBy(selectedItem.value.class.device, selectedItem.value.class.mode, newModifier)
}

function selectMode(mode) {
  console.log('selecting mode' + mode)
  const newMode = mode === 'default' ? '' : mode + ':'
  selectedItem.value.class  = findOrCreateClassBy(selectedItem.value.class.device, newMode, selectedItem.value.class.modifier)
}

</script>

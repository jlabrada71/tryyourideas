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
    </div>
    
    <div class="w-8/12">
      <div class="bg-slate-100 p-10 ">
        <SelectorsDevice :device="selectedDevice" @update:device="selectDevice"></SelectorsDevice>

        <!-- Component view -->

        <div :class="treeViewContainerClass">             
          <TreeItemView :item="tree" :device="selectedDevice" :mode="selectedMode" :refresh="refreshTreeView" @selected="selectItem"></TreeItemView>
        </div>
         <!-- Component view -->
      </div>
      
    </div>
    <div class="w-2/12 bg-slate-50 px-2 h-auto container">
      <PropertyEditor :item="selectedItem" @update:item="updateItem" @update:modifier="selectModifier"></PropertyEditor>    
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getComponentRenderedClass } from '../lib/ClassGeneration'
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
    editorClass: '',
    renderedClass: '',
    classes: [],
    class: {
      device: 'any',
      mode: 'light',
      modifier: 'default',

      backgroundColor: 'bg-blue-500',
      width: 'w-10',
      height: 'h-10',
      padding: 'default',
      margin: 'default',
      spacing: 'default',

      textColor: 'text-white',
      fontSize: 'default',
      fontFamily: 'default',
      fontWeight:'default',
      letterSpacing: 'default',
      lineHeight: 'default',
      textAlign: 'default',
      textVerticalAlign: 'default',

      borderColor: 'border-slate-100',
      borderStyle: 'default',
      borderWidth: 'default',
      borderRadius: 'default',

      shadow: 'default',
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
  editorClass: '',
  renderedClass: '',
  classes: [],
  class: {
    device: 'any',
    mode: 'light',
    modifier: 'default',

    backgroundColor: 'bg-blue-500',
    width: 'w-40',
    height: 'h-40',
    padding: 'default',
    margin: 'default',
    spacing: 'default',


    textColor: 'text-white',
    fontSize: 'default',
    fontFamily: 'default',
    fontWeight: 'default',
    letterSpacing: 'default',
    lineHeight: 'default',
    textAlign: 'default',
    textVerticalAlign: 'default',

    borderColor: 'border-slate-100',
    borderStyle: 'default',
    borderWidth: 'default',
    borderRadius: 'default',

    shadow: 'default',
    shadowColor: 'shadow-slate-100',

    divideColor: 'divide-blue-50',
    outlineColor: 'outline-blue-50',
    ringColor: 'ring-blue-50',
  }
})

const refreshTreeView = ref(false)

const selectedDevice = ref('any')
const selectedMode = ref('light')
const selectedDeviceWidth = {
  any: 'w-full',
  sm: 'w-[640px]',
  md: 'w-[768px]',
  lg: 'w-[1024px]',
  xl: 'w-[1280px]',
  '2xl': '[1536px]'
}
const treeViewContainerClass = computed(() => `bg-white ${selectedDeviceWidth[selectedDevice.value]} flex align-middle shadow-lg justify-center h-screen`)

onMounted(() => {
  defaultItem.classes.push(defaultItem.class)
  tree.value.classes.push(tree.value.class)
  selectDevice('any')
})

const selectedItem = ref(tree.value)

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

function printTree(item) {
  console.log('==================================')
  console.log(item.id)
  const printClass = cls => console.log(`${cls.mode}:${cls.device}:${cls.modifier}:${cls.backgroundColor}`)
  printClass(item.class) 
  item.classes.forEach(cls => {
    printClass(cls)
  })
  item.children.forEach(child => printTree(child))
}

function getItemById(node, id) {
  if (node.id === id) return node
  const candidate = node.children.find(child => id.startsWith(child.id))
  return getItemById(candidate, id)
}

function copy(cls1, cls2) {
  for(const key in cls1) {
    cls2[key] = cls1[key]
  }
}

function printClassKey({ mode, device, modifier }) {
  console.log(`key: "${mode}:${device}:${modifier}"`)
}

function createClassKey( mode, device, modifier ) {
  return {mode, device, modifier }
}

function getClassKey(itemClass) {
  printClassKey(itemClass)
  return { mode: itemClass.mode, device: itemClass.device, modifier: itemClass.modifier }
}

function updateItem(modifiedItem) {
  const item = getItemById(tree.value, modifiedItem.id)
  console.log('updating item: ', item.id)

  item.type = modifiedItem.type

  const editedClass = findClassBy(item, getClassKey( modifiedItem.class ) )
  console.log('editedClass')
  console.log(editedClass)
  copy(modifiedItem.class, editedClass)
  // item.classes = modifiedItem.classes
  item.renderedClass = getComponentRenderedClass(item)

  selectedItem.value.item

  refreshTreeView.value = ! refreshTreeView.value  // this forces the tree view refresh
  console.log('******** Updating item: ')
  console.log(selectedItem.value.id )  
  console.log(selectedItem.value.class.backgroundColor)
  // printTree(tree.value)
  // console.log(selectedItem.value.renderedClass)
  console.log('1111111111111111111111')
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
  newItem.class.mode = selectedItem.value.class.mode
  newItem.class.device = selectedItem.value.class.device
  newItem.class.modifier = selectedItem.value.class.modifier
  newItem.classes.push(newItem.class)
  
  newItem.id = `${parent.id}-${parent.children.length + 1}`,
  parent.children.push(newItem)
  selectItem(newItem)
}

function selectItem(item) {
  console.log('selected: ' + item.id)
  selectedItem.value.isSelected = false
  selectedItem.value = item
  selectedItem.value.class = findOrCreateClassBy(selectedItem.value, selectedDevice.value, selectedMode.value, item.class.modifier)
  selectedItem.value.isSelected = true 
}

function findClassBy(item, { device, mode, modifier }) {
  console.log('looking for')
  item.classes.forEach(cls => console.log(`${cls.device} ${device}`))
  return item.classes.find((cls) => cls.device === device && cls.mode === mode && cls.modifier === modifier)
}

function findOrCreateClassBy(item, device, mode, modifier) {
  // if (selectedItem.value.classes.lenght === 0 ) {  // if the classes list is empty add current class.
  //   selectedItem.value.classes.push(selectedItem.value.class)
  // }
  const result = findClassBy(item, { device, mode, modifier})
  if (result) return result;
  const resultClass = clone(item.class)
  resultClass.mode = mode
  resultClass.device = device
  resultClass.modifier = modifier
  item.classes.push(resultClass)
  return resultClass
}

function selectDevice(device) {
  console.log('selecting device: ' + device)
  selectedDevice.value = device
  const newDevice = device
  selectedItem.value.class  = findOrCreateClassBy(selectedItem.value, newDevice, selectedItem.value.class.mode, selectedItem.value.class.modifier)
}

function selectModifier(modifier) {
  const newModifier = modifier
  console.log(`adding modifier ${modifier} "${newModifier}"`)
  selectedItem.value.class  = findOrCreateClassBy(selectedItem.value, selectedItem.value.class.device, selectedItem.value.class.mode, newModifier)
}

function selectMode(mode) {
  console.log('selecting mode' + mode)
  const newMode = mode 
  selectedItem.value.class  = findOrCreateClassBy(selectedItem.value, selectedItem.value.class.device, newMode, selectedItem.value.class.modifier)
}

</script>

<template>
  <div class="w-full h-20 bg-cyan-50 shadow-xl shadow-cyan-50 z-40"></div>
  <div class="flex">
    <div class="w-2/12 h-screen bg-slate-50 z-40">
      <div class="bg-slate-600 text-white w-full">Components</div>
      <div v-for="component in componentList">
        <div>{{component.name}}</div>
        <TreeItem :item="selectedComponent" 
          @update:add-child="addChild" 
          @update:remove="removeItem" 
          @selected="selectItem"/>
      </div>
      <div class="bg-slate-600 text-white w-full mt-10">Export</div>
      <div class="bg-slate-200 m-5 p-5 h-auto">{{exported}}</div>
      <div class="bg-slate-600 text-white w-full mt-10">Rendered class</div>
      <div>
        {{selectedItem.renderedClass}}
      </div>
    </div>
    
    <div class="w-8/12">
      <div class="bg-slate-100 p-10 ">
        <div class="flex justify-between">
          <SelectorsDevice :device="selectedDevice" @update:device="selectDevice"></SelectorsDevice>
          <SelectorsMode :mode="selectedMode" @update:mode="selectMode"></SelectorsMode>
        </div>

        <!-- Component view -->

        <div :class="treeViewContainerClass">             
          <TreeItemView :item="selectedComponent" :device="selectedDevice" :mode="selectedMode" :refresh="refreshTreeView" @selected="selectItem"></TreeItemView>
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
import { getItemById, findClassBy, findOrCreateClassBy, clone, copy, removeItemFrom } from '../lib/EditorUtils'
import { printTree } from '../lib/DebugUtils'
import { toHtml } from '../lib/HtmlExporter.js'
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

const divideColor = ref('divide')
const outlineColor = ref('outline')
const ringColor = ref('ring')
const itemTemplate = {
    name: 'div',
    type: 'div',
    children: [],
    text: '',
    editorClass: '',
    renderedClass: '',
    classes: [{
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
    }],
  }

const componentList = ref([])

const selectedComponent = ref(clone(itemTemplate))

selectedComponent.value.id = '1'
selectedComponent.value.editorId = '1'
selectedComponent.value.name = 'root'
selectedComponent.value.type ='template'

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

const selectedItem = ref(selectedComponent.value)

const treeViewBackground = computed(() => selectedMode.value==='light' ? 'bg-white': 'bg-black' )
const treeViewContainerClass = computed(() => `${selectedMode.value==='light' ? 'bg-white': 'bg-black'} ${selectedDeviceWidth[selectedDevice.value]} flex align-middle shadow-lg justify-center h-screen`)

onMounted(() => {
  // selectedComponent.value = clone(itemTemplate)
  selectedComponent.value.currentClass = selectedComponent.value.classes[0]
  componentList.value.push(selectedComponent.value)
  selectDevice('any')
  selectMode('light')
})

const exported = computed(() => toHtml(selectedComponent.value))

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
  const item = getItemById(selectedComponent.value, modifiedItem.id)
  console.log('updating item: ', item.id)

  item.type = modifiedItem.type

  const editedClass = findClassBy(item, getClassKey( modifiedItem.currentClass ) )
  console.log('editedClass')
  console.log(editedClass)
  copy(modifiedItem.currentClass, editedClass)
  // item.classes = modifiedItem.classes
  item.renderedClass = getComponentRenderedClass(item)

  selectedItem.value.item

  refreshTreeView.value = ! refreshTreeView.value  // this forces the selectedComponent view refresh
  // console.log('******** Updating item: ')
  // console.log(selectedItem.value.id )  
  // console.log(selectedItem.value.currentClass.backgroundColor)
  // printTree(selectedComponent.value)
  // console.log(selectedItem.value.renderedClass)
  // console.log('1111111111111111111111')
}

function removeItem(node) {
  if (node.id === '1') return; // root can not be removed
  removeItemFrom(selectedComponent.value, node)
}

function addChild(parent) {
  const newItem = clone(itemTemplate)
  newItem.currentClass = newItem.classes[0]
  newItem.currentClass.mode = selectedItem.value.currentClass.mode
  newItem.currentClass.device = selectedItem.value.currentClass.device
  newItem.currentClass.modifier = 'default' // selectedItem.value.currentClass.modifier
  newItem.classes.push(newItem.currentClass)
  
  newItem.id = `${parent.id}-${parent.children.length + 1}`,
  newItem.editorId = newItem.id
  parent.children.push(newItem)
  selectItem(newItem)
}

function selectItem(item) {
  console.log('selected: ' + item.id)
  selectedItem.value.isSelected = false
  selectedItem.value = item
  selectedItem.value.currentClass = findOrCreateClassBy(selectedItem.value, selectedDevice.value, selectedMode.value, item.currentClass.modifier)
  selectedItem.value.isSelected = true 
}

function selectDevice(device) {
  console.log('selecting device: ' + device)
  selectedDevice.value = device
  const newDevice = device
  selectedItem.value.currentClass  = findOrCreateClassBy(selectedItem.value, newDevice, selectedItem.value.currentClass.mode, selectedItem.value.currentClass.modifier)
}

function selectModifier(modifier) {
  const newModifier = modifier
  console.log(`adding modifier ${modifier} "${newModifier}"`)
  selectedItem.value.currentClass  = findOrCreateClassBy(selectedItem.value, selectedItem.value.currentClass.device, selectedItem.value.currentClass.mode, newModifier)
}

function selectMode(mode) {
  console.log('selecting mode ' + mode)
  selectedMode.value = mode
  const newMode = mode 
  selectedItem.value.currentClass  = findOrCreateClassBy(selectedItem.value, selectedItem.value.currentClass.device, newMode, selectedItem.value.currentClass.modifier)
}

</script>

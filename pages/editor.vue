<template>
  <div class="w-full h-20 bg-cyan-50 shadow-xl shadow-cyan-50 z-40">
    <button type="button" class="text-white w-12 m-2">
      <!-- <style type="text/css">.st0{fill:#4DBA87;} .st1{fill:#425466;}</style> -->
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 106.42" style="enable-background:new 0 0 122.88 106.42" xml:space="preserve"><g><polygon class="st0" points="75.63,0 61.44,24.58 47.25,0 0,0 61.44,106.42 122.88,0 75.63,0"/><polygon class="st1" points="75.63,0 61.44,24.58 47.25,0 24.58,0 61.44,63.85 98.3,0 75.63,0"/></g></svg>
    </button>
  </div>
  <div class="flex">
    <div class="w-2/12 h-screen bg-slate-50 z-40">
      <div class="flex bg-slate-600 text-white">
        <div class=" w-10/12">Components</div>
        <button type="button" class="text-white w-5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click.stop="createNewComponent">
          <svg id="Layer_1" data-name="Layer 1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 100.06"><title>Add component</title><path class="cls-1" d="M50.34,34.25h5.39a2.49,2.49,0,0,1,2.48,2.48v8h8a2.51,2.51,0,0,1,2.48,2.48v5.4a2.52,2.52,0,0,1-2.48,2.48h-8v8a2.51,2.51,0,0,1-2.48,2.48H50.34a2.51,2.51,0,0,1-2.49-2.48v-8h-8a2.5,2.5,0,0,1-2.48-2.48v-5.4a2.48,2.48,0,0,1,2.48-2.48h8v-8a2.49,2.49,0,0,1,2.49-2.48ZM7.67,0H98.35A7.69,7.69,0,0,1,106,7.67v68a7.7,7.7,0,0,1-7.67,7.67H7.67A7.69,7.69,0,0,1,0,75.69v-68A7.69,7.69,0,0,1,7.67,0ZM99.05,23.92H7.31V74a2.09,2.09,0,0,0,.62,1.5,2.13,2.13,0,0,0,1.51.62H96.89a2.11,2.11,0,0,0,1.51-.62A2.09,2.09,0,0,0,99,74V23.92ZM91,8.62a3.79,3.79,0,1,1-3.79,3.79A3.79,3.79,0,0,1,91,8.62Zm-25.68,0a3.79,3.79,0,1,1-3.79,3.79,3.79,3.79,0,0,1,3.79-3.79Zm12.84,0a3.79,3.79,0,1,1-3.79,3.79A3.79,3.79,0,0,1,78.2,8.62Zm37,8.07.36,23.92V90.69a2.12,2.12,0,0,1-2.13,2.13H26a2.12,2.12,0,0,1-2.12-2.13h-7v1.68a7.7,7.7,0,0,0,7.67,7.68h90.68a7.7,7.7,0,0,0,7.67-7.68v-68a7.7,7.7,0,0,0-7.67-7.68Z"/></svg>
        </button>
      </div>
      <div v-for="component in componentList">
        <div>
          <EditableLabel 
            v-model:text="component.name" 
            @select="selectComponent(component)" 
            @remove="removeComponent(component)"
            validator="[A-Z][A-Za-z0-9\-]*">
          </EditableLabel>          
          
          <ItemTree 
            v-if="component.id===selectedComponent.id"
            :item="selectedComponent.root" 
            @update:add-child="addChild" 
            @update:remove="removeItem" 
            @selected="selectItem"/>
        </div>
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
          <ItemTreeView :item="selectedComponent.root" :device="selectedDevice" :mode="selectedMode" :refresh="refreshTreeView" @selected="selectItem"></ItemTreeView>
        </div>
         <!-- Component view -->
      </div>
      
    </div>
    <div class="w-2/12 bg-slate-50 px-2 h-auto container">
      <ItemEditor :item="selectedItem" @update:item="updateItem" @update:modifier="selectModifier"></ItemEditor>    
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getComponentRenderedClass } from '../lib/ClassGeneration'
import { getNextId } from '../lib/IdGeneration'
import { getItemById, findClassBy, findOrCreateClassBy, clone, copy, removeItemFrom } from '../lib/EditorUtils'
import { printTree } from '../lib/DebugUtils'
import { toHtml } from '../lib/HtmlExporter.js'
import axios from 'axios'
import { throttle } from 'lodash'
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

    let tailwindLoaded = false

    useHead({
      script: [
        {
          hid: 'tailswindcss',
          src: '<https://cdn.tailwindcss.com>',
          defer: true,
          // Changed after script load
          callback: () => { tailwindLoaded = true } 
        }
      ]
    })
// each project has many components
// each component has:
//    - an item tree
//    - properties
//    - events       
// the component name is unique     
// each item has:
//    - type
//    - properties
//    - style
// the item id is created by 'componentName' + treeId(1-2-3) + max id of level + 1
// the item editorId is initialized to the same value as item id
// the item editorId is editable as long as it is unique within the whole components project

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
    props: [],
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
      display: 'flex',
      flexBasis: 'default',
      flexDirection: 'flex-row',
      flexWrap: 'default',
      flexShrinkGrow: 'default',

      gap: 'default', 
      justifyContent: 'default',
      justifyItems: 'default',
      justifySelf: 'default',

      alignContent: 'default',
      alignItems: 'default',
      alignSelf: 'default',

      placeContent: 'default',
      placeItems: 'default',
      placeSelf: 'default',

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
const project = ref({
  name: '',
  components: [],
})

const componentList = ref([])
project.value.components = componentList.value

const selectedComponent = ref(newComponent())
const selectedItem = ref(selectedComponent.value.root)
componentList.value.push(selectedComponent.value)

function save(obj) {
  axios({
  method: 'post',
  url: 'http://localhost:3000/api/v1/model',
  data: obj
  });
}

const throttledSave = throttle(save, 30*1000)

function saveProject() {
  console.log('saveProject')
  throttledSave(project.value)
}

function newComponent() {
  const component = {
    name: 'Component',
    root: clone(itemTemplate),
    properties: [],
    events: []
  }
  component.id = getNextId(componentList.value).toString()
  component.editorId = component.id
  component.name = `Component-${component.id}`
  component.root.id = component.id
  component.root.editorId = component.editorId
  component.root.type = 'template'
  component.root.currentClass = component.root.classes[0]
  return component
}

function createNewComponent() {
  const component = newComponent()
  componentList.value.push(component)
  selectedComponent.value = component
}

function removeComponent(componentToDelete) {
  if (componentList.value.length < 2) return
  componentList.value = componentList.value.filter( component => component.id !== componentToDelete.id )
  if (componentToDelete.id === selectedComponent.value.id ) {
    selectComponent(componentList.value[0])
  }
}

function selectComponent(component) {
  selectedComponent.value = component
  selectItem(selectedComponent.value.root)
}

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

const treeViewBackground = computed(() => selectedMode.value==='light' ? 'bg-white': 'bg-black' )
const treeViewContainerClass = computed(() => `${selectedMode.value==='light' ? 'bg-white': 'bg-black'} ${selectedDeviceWidth[selectedDevice.value]} flex align-middle shadow-lg justify-center h-screen`)

onMounted(() => {
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
  const item = getItemById(selectedComponent.value.root, modifiedItem.id)
  console.log('updating item: ', item.id)

  item.type = modifiedItem.type
  item.props = modifiedItem.props
  console.log(modifiedItem.props)

  const editedClass = findClassBy(item, getClassKey( modifiedItem.currentClass ) )
  console.log('editedClass')
  console.log(editedClass)
  copy(modifiedItem.currentClass, editedClass)
  // item.classes = modifiedItem.classes
  item.renderedClass = getComponentRenderedClass(item)

  selectedItem.value.item

  refreshTreeView.value = ! refreshTreeView.value  // this forces the selectedItem view refresh
  // console.log('******** Updating item: ')
  // console.log(selectedItem.value.id )  
  // console.log(selectedItem.value.currentClass.backgroundColor)
  // printTree(selectedItem.value)
  // console.log(selectedItem.value.renderedClass)
  // console.log('1111111111111111111111')
  saveProject()
}

function removeItem(node) {
  if (node.id === '1') return; // root can not be removed
  removeItemFrom(selectedComponent.value.root, node)
}

function addChild(parent) {
  const newItem = clone(itemTemplate)
  newItem.currentClass = newItem.classes[0]
  newItem.currentClass.modifier = 'default' // selectedItem.value.currentClass.modifier
  
  newItem.id = `${parent.id}-${parent.children.length + 1}`,
  newItem.editorId = newItem.id
  parent.children.push(newItem)
  selectItem(newItem)
}

function selectItem(item) {
  console.log('selected: ' + item.id)
  selectedItem.value.isSelected = false
  selectedItem.value = item
  selectedItem.value.currentClass = findOrCreateClassBy(item, selectedDevice.value, selectedMode.value, 'default' /*item.currentClass.modifier */)
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

<template>
  <div class="w-full h-20 bg-cyan-50 shadow-xl shadow-cyan-50 z-40"></div>
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
            @remove="removeComponent(component)">
          </EditableLabel>          
          
          <TreeItem 
            v-if="component.id===selectedComponent.id"
            :item="selectedComponent" 
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
          <TreeItemView :item="selectedComponent" :device="selectedDevice" :mode="selectedMode" :refresh="refreshTreeView" @selected="selectItem"></TreeItemView>
        </div>
         <!-- Component view -->
      </div>
      
    </div>
    <div class="w-2/12 bg-slate-50 px-2 h-auto container">
      <ClassEditor :item="selectedItem" @update:item="updateItem" @update:modifier="selectModifier"></ClassEditor>    
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

// the component name is unique
// the sub-component id is created by 'componentName' + treeId(1-2-3) + max id of level + 1
// the sub-component editorId is initialized to the same value as subcomponent id
// the sub-component editorId is editable as long as it is unique within the whole components project


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
const selectedItem = ref(selectedComponent.value)

function createNewComponent() {
  const newComponent = clone(itemTemplate)
  newComponent.id = getNextId(componentList.value).toString()
  newComponent.editorId = newComponent.id
  newComponent.name = `Component-${newComponent.id}`
  newComponent.type = 'template'
  newComponent.currentClass = newComponent.classes[0]
  componentList.value.push(newComponent)
  selectedComponent.value = newComponent
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
  selectItem(selectedComponent.value)
}

function editName(component) {
  component.isEditing
}
selectedComponent.value.id = '1'
selectedComponent.value.editorId = '1'
selectedComponent.value.name = 'Component'
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

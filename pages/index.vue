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
          <div class="flex flex-row  bg-red-600 text-white group" @click="selectComponent(component)">
            <div class=" w-10/12">{{component.name}}</div>
            <div class="hidden flex justify-self-end group-hover:block group-focus:block gap-4">  
              <div class="flex justify-self-end gap-4">
                <button type="button" class="text-white w-5 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"  @click.stop="editName(component)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 506 511.95">
                    <title>Change name</title>
                    <path fill-rule="nonzero" d="M400.08 26.04c-1.82-1.81-3.72-3.14-5.7-3.97-1.89-.8-4.05-1.2-6.47-1.2-2.38 0-4.52.41-6.4 1.21-1.95.83-3.83 2.15-5.63 3.96l-36.73 36.73 104.11 104.57 37.22-37.22c1.55-1.54 2.69-3.29 3.44-5.18l.15-.38c.71-1.96 1.06-4.17 1.06-6.56 0-2.49-.4-4.82-1.22-6.89l-.22-.62c-.74-1.64-1.79-3.16-3.16-4.52l-80.45-79.93zM69.03 332.8l105.03 103.23 215.22-215.22-104.09-104.17L69.03 332.8zm86.27 113.97-96.28-94.62-27.86 99.15c-4.45 15.91-7.46 28.06-9.05 36.44 19.79-5.98 40.2-11.61 59.73-18.29 10.75-3.39 21.78-6.87 39.25-12.28l24.1-7.34 10.11-3.06zM402.45 2.91c4.5 1.89 8.61 4.69 12.3 8.37l80.45 79.93c3.35 3.33 5.9 7.12 7.68 11.27l.43.96c1.81 4.57 2.69 9.48 2.69 14.56 0 4.87-.8 9.56-2.45 13.97l-.23.63c-1.79 4.53-4.47 8.67-8.08 12.28l-44.64 44.6c-4.07 4.05-10.66 4.03-14.71-.04L317.04 70.11c-4.07-4.07-4.07-10.68 0-14.76l44.08-44.07c3.65-3.66 7.72-6.45 12.23-8.36C377.92.98 382.77 0 387.91 0c5.1 0 9.94.97 14.54 2.91zM174.77 462.66l-23.54 7.07-24.03 7.32c-30.42 9.57-60.67 18.96-91.16 28.28-10.56 3.19-17.58 5.27-20.89 6.17-1.41.4-2.83.54-4.3.39-6.12-.62-9.68-4.3-10.63-11.06-.33-2.28-.28-5.21.13-8.77 1.03-9 4.62-24.47 10.75-46.39l32.27-114.82c.5-1.78 1.43-3.33 2.66-4.55L277.79 94.52c4.07-4.07 10.68-4.07 14.76 0l118.84 118.97c4.05 4.07 4.03 10.65-.02 14.7l-231.66 231.7a10.373 10.373 0 0 1-4.94 2.77z"/>
                  </svg>
                </button>
                <button type="button" class="text-white w-5 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"  @click.stop="removeComponent(component)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <title>Delete component</title>
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </div>          
              
            </div>
          </div>
          
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
      <PropertyEditor :item="selectedItem" @update:item="updateItem" @update:modifier="selectModifier"></PropertyEditor>    
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

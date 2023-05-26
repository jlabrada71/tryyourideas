<template>
  <UserForm :user="currentUser" @update:user="account=>updateUser(account)"></UserForm>
  <ProjectNewForm :project="project" :store="newProject"></ProjectNewForm>
  <ProjectOpenForm :user="currentUser" :store="openProject"></ProjectOpenForm>
  <ProjectExportForm :project="project" :store="generateNuxtTailwindsStorybook"></ProjectExportForm>
  <IssuesForm :project="project" :store="saveIssues"></IssuesForm>
  <div class="w-full h-10 bg-slate-100 text-black flex">User: {{currentUser.name}} Project: {{project.name}} Licence: {{currentUser.licence}} </div>
  <div class="w-full h-10 bg-slate-50 shadow-xl shadow-slate-50 z-40 flex">
    <OpenFormButton target="newUserForm">New User</OpenFormButton>
    <OpenFormButton target="newProjectForm">New Project</OpenFormButton>
    <OpenFormButton target="openProjectForm">Open Project</OpenFormButton>
    <OpenFormButton target="exportProjectForm">Export Project</OpenFormButton>
    <OpenFormButton target="issuesForm">Report Issue</OpenFormButton>
  </div>
  <div class="flex">
    <div class="w-72 h-screen bg-slate-50 z-40">
      <div class="flex bg-slate-600 text-white">
        <div class=" w-10/12">Components</div>
        <button type="button" class="text-white w-5 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium text-sm dark:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800" @click.stop="createNewComponent">
          <svg id="Layer_1" data-name="Layer 1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 100.06"><title>Add component</title><path class="cls-1" d="M50.34,34.25h5.39a2.49,2.49,0,0,1,2.48,2.48v8h8a2.51,2.51,0,0,1,2.48,2.48v5.4a2.52,2.52,0,0,1-2.48,2.48h-8v8a2.51,2.51,0,0,1-2.48,2.48H50.34a2.51,2.51,0,0,1-2.49-2.48v-8h-8a2.5,2.5,0,0,1-2.48-2.48v-5.4a2.48,2.48,0,0,1,2.48-2.48h8v-8a2.49,2.49,0,0,1,2.49-2.48ZM7.67,0H98.35A7.69,7.69,0,0,1,106,7.67v68a7.7,7.7,0,0,1-7.67,7.67H7.67A7.69,7.69,0,0,1,0,75.69v-68A7.69,7.69,0,0,1,7.67,0ZM99.05,23.92H7.31V74a2.09,2.09,0,0,0,.62,1.5,2.13,2.13,0,0,0,1.51.62H96.89a2.11,2.11,0,0,0,1.51-.62A2.09,2.09,0,0,0,99,74V23.92ZM91,8.62a3.79,3.79,0,1,1-3.79,3.79A3.79,3.79,0,0,1,91,8.62Zm-25.68,0a3.79,3.79,0,1,1-3.79,3.79,3.79,3.79,0,0,1,3.79-3.79Zm12.84,0a3.79,3.79,0,1,1-3.79,3.79A3.79,3.79,0,0,1,78.2,8.62Zm37,8.07.36,23.92V90.69a2.12,2.12,0,0,1-2.13,2.13H26a2.12,2.12,0,0,1-2.12-2.13h-7v1.68a7.7,7.7,0,0,0,7.67,7.68h90.68a7.7,7.7,0,0,0,7.67-7.68v-68a7.7,7.7,0,0,0-7.67-7.68Z"/></svg>
        </button>
      </div>
      <ComponentTypeMenu v-if="selectingChildType" @cancel="cancelAddItem" @selected="addItem"></ComponentTypeMenu>
      <div v-for="component in componentList">
        <div>
          <EditableLabel 
            :text="component.name" 
            @select="selectComponent(component)" 
            @remove="removeComponent(component)"
            @update:text="value => updateComponent(component, 'name', value)"
            validator="[A-Z][A-Za-z0-9\-]*">
          </EditableLabel>          
          <ItemTree 
            v-if="component.id===selectedComponent.id"
            :item="selectedComponent.root" 
            @update:add-child="selectItemType" 
            @update:remove="removeItem" 
            @selected="selectItem"/>
        </div>
      </div>
    </div>
    
    <div class="w-full">
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
    <div class="w-96 bg-slate-50 px-2 h-auto container">
      <ItemEditor :item="selectedItem" @update:item="updateItem" @update:modifier="selectModifier"></ItemEditor>    
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStorage } from '@vueuse/core'
import { getComponentRenderedClass } from '../lib/ClassGeneration'
import { getNextId } from '../lib/IdGeneration'
import { getItemById, findClassBy, findOrCreateClassBy, clone, copy, removeItemFrom } from '../lib/EditorUtils'
import { printTree } from '../lib/DebugUtils'
import { toHtml } from '../lib/HtmlExporter.js'
import axios from 'axios'
import _ from 'lodash'; 
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

    const { throttle } = _;

    const config = useRuntimeConfig()
    
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

    backgroundColor: 'default',
    width: 'default',
    height: 'default',
    padding: 'default',
    
    margin: 'default',
    marginTop: 'default',
    marginLeft: 'default',
    marginRight: 'default',
    marginBottom: 'default',

    spacing: 'default',
    display: 'default',
    flexBasis: 'default',
    flexDirection: 'default',
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

    textColor: 'default',
    fontSize: 'default',
    fontFamily: 'default',
    fontWeight:'default',
    letterSpacing: 'default',
    lineHeight: 'default',
    textAlign: 'default',
    textVerticalAlign: 'default',

    borderColor: 'default',
    borderStyle: 'default',
    borderWidth: 'default',
    borderRadius: 'default',

    shadow: 'default',
    shadowColor: 'default',

    divideColor: 'default',
    outlineColor: 'default',
    ringColor: 'default',

    transition: 'default',
    transitionDuration: 'default',
    transitionTiming: 'default',
    transitionDelay: 'default',
    animation: 'default',

    transformScale: 'default',
    transformRotate: 'default',
    transformTranslate: 'default',
    transformSkew: 'default',
    transformOrigin: 'default',

    gradientDirection: 'default',
    gradientFromColor: 'default',
    gradientViaColor: 'default',
    gradientToColor: 'default',

    fillColor: 'default',
  }],
}

const currentUser = useStorage('user', {
  name: 'anonimous',
  email: 'default',
  id: 'undefined',
  licence: 'community',
  maxProjects: '1'
})

function updateUser(account) {
  currentUser.value = account
}

const project = ref({
  name: 'default',
  components: [],
})

function initProject(projectValue) {
  componentList.value = projectValue.components
  selectComponent(projectValue.components[0])
  selectDevice('any')
  selectMode('light')
}

function newProject(data) {
  project.value = {
    name: data.name,
    components: []
  }
  project.value.components.push(newComponent())
  initProject(project.value)
}

function openProject(projectValue) {
  project.value = projectValue
  initProject(projectValue)
}

const throttledSave = throttle(saveModel, 5*1000)

function saveProject() {
  if (currentUser.value.id === 'undefined') return
  project.value.userId = currentUser.value.id
  throttledSave(project.value)
}

const componentList = ref([])
const selectedComponent = ref(newComponent())
const selectedItem = ref(selectedComponent.value.root)

function postToServer(obj, url) {
  return axios({
    method: 'post',
    url,
    data: obj
  });
}

function saveModel(obj) {
  return postToServer(obj, `${config.public.apiBase}/projects`)
}

function saveIssues(obj) {
  return postToServer(obj, `${config.public.apiBase}/issues`)
}

function generateNuxtTailwindsStorybook(generate) {
  return postToServer(project.value, `${config.public.apiBase}/generation`)
}

function initializeComponentClass(componentClass) {
  componentClass.width = 'w-40'
  componentClass.height = 'h-40'
  componentClass.backgroundColor = 'bg-slate-100'
  componentClass.display = 'flex'
  componentClass.flexDirection = 'flex-row'
}

function initializeItemClass(itemClass) {
  itemClass.width = 'w-10'
  itemClass.height = 'h-10'
  itemClass.backgroundColor = 'bg-slate-200'
  itemClass.display = 'flex'
  itemClass.flexDirection = 'flex-row'
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
  component.root.type = 'div'
  component.root.name = 'root'
  component.root.currentClass = component.root.classes[0]
  initializeComponentClass(component.root.currentClass)
  return component
}

watch([componentList, project, selectedComponent, selectedItem], (newValue, oldValue) => saveProject())

function createNewComponent() {
  const component = newComponent()
  componentList.value.push(component)
  selectComponent(component)
  saveProject()
}

function removeComponent(componentToDelete) {
  if (componentList.value.length < 2) return
  componentList.value = componentList.value.filter( component => component.id !== componentToDelete.id )
  if (componentToDelete.id === selectedComponent.value.id ) {
    selectComponent(componentList.value[0])
  }
  saveProject()
}

function updateComponent(component, propertyName, value) {
  component[propertyName] = value
  saveProject()
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
  
  newProject( {name: 'Default'} )
})

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
  console.log(modifiedItem)
  console.log(`${modifiedItem.currentClass.marginTop}  ${modifiedItem.currentClass.marginLeft} ${modifiedItem.currentClass.marginRight} ${modifiedItem.currentClass.marginBottom}`)

  const editedClass = findClassBy(item, getClassKey( modifiedItem.currentClass ) )

  copy(modifiedItem.currentClass, editedClass)
  // item.classes = modifiedItem.classes
  item.renderedClass = getComponentRenderedClass(item)

  selectedItem.value.item

  refreshTreeView.value = ! refreshTreeView.value  // this forces the selectedItem view refresh
  saveProject()
}

function removeItem(node) {
  if (node.id === '1') return; // root can not be removed
  removeItemFrom(selectedComponent.value.root, node)
  saveProject()
}

const selectingChildType = ref(false)
const parentForNewChild = ref(null)

function openSelectTypeDialog(parent) {
  selectingChildType.value = true
  parentForNewChild.value = parent
}

function closeSelectTypeDialog() {
  selectingChildType.value = false
  parentForNewChild.value = null
}

function selectItemType(parent) {
  openSelectTypeDialog(parent)
}

function cancelAddItem() {
  closeSelectTypeDialog()
}

function initializeProp(prop) {
  return { ...prop, value: prop.default }
}

function newProps(props) {
  return props.map(prop => initializeProp(prop))
}

function addItem(type)  {
  const newItem = clone(itemTemplate)
  newItem.currentClass = newItem.classes[0]
  initializeItemClass(newItem.currentClass)
  newItem.currentClass.modifier = 'default' // selectedItem.value.currentClass.modifier
  
  newItem.id = `${parentForNewChild.value.id}-${parentForNewChild.value.children.length + 1}`,
  newItem.editorId = newItem.id
  newItem.type = type.name
  newItem.props = newProps(type.props)
  newItem.needsResolve = type.needsResolve
  parentForNewChild.value.children.push(newItem)
  closeSelectTypeDialog()
  selectItem(newItem)
  saveProject()
}

function selectItem(item) {

  selectedItem.value.isSelected = false
  selectedItem.value = item
  selectedItem.value.currentClass = findOrCreateClassBy(item, selectedDevice.value, selectedMode.value, 'default' /*item.currentClass.modifier */)
  selectedItem.value.isSelected = true 
}

function selectDevice(device) {

  selectedDevice.value = device
  const newDevice = device
  selectedItem.value.currentClass  = findOrCreateClassBy(selectedItem.value, newDevice, selectedItem.value.currentClass.mode, selectedItem.value.currentClass.modifier)
}

function selectModifier(modifier) {
  const newModifier = modifier

  selectedItem.value.currentClass  = findOrCreateClassBy(selectedItem.value, selectedItem.value.currentClass.device, selectedItem.value.currentClass.mode, newModifier)
}

function selectMode(mode) {

  selectedMode.value = mode
  const newMode = mode 
  selectedItem.value.currentClass  = findOrCreateClassBy(selectedItem.value, selectedItem.value.currentClass.device, newMode, selectedItem.value.currentClass.modifier)
}

</script>

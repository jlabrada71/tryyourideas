<template>
  <ProjectNewForm  @new="createNewProject"></ProjectNewForm>
  <ProjectOpenForm :user="currentUser" @open="openProject"></ProjectOpenForm>
  <ProjectExportForm :user="currentUser" :project="project" @export="generateNuxtTailwindsStorybook"></ProjectExportForm>
  <IssuesForm :project="project" :store="saveIssues"></IssuesForm>
  <div class="w-full h-10 bg-slate-100 text-black flex">User: {{currentUser.name}} Project: {{project.name}} Licence: {{currentUser.licence}} Provider:{{currentUser.provider}}</div>
  <!-- <h2>Access</h2>
  <p>{{accessToken}}</p>
  <h2>Refresh</h2>
  <p>{{refreshToken}}</p> -->
  <!-- <button @click="getLoggedUserData">find user</button> -->
  <ToolBar>
    <ToolBarButton target="newProjectForm" title="Create new project">
      <svg xmlns="http://www.w3.org/2000/svg" id="id-8-1-1" class=" flex flex-row bg-transparent w-8 h-8 " viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
        <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zm48 96a144 144 0 1 1 0 288 144 144 0 1 1 0-288zm16 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v48H368c-8.8 0-16 7.2-16 16s7.2 16 16 16h48v48c0 8.8 7.2 16 16 16s16-7.2 16-16V384h48c8.8 0 16-7.2 16-16s-7.2-16-16-16H448V304z" />
      </svg>
    </ToolBarButton>
    <ToolBarButton title="Save changes" @click="saveProject">
      <div v-if="project.dirty">
        <svg  xmlns="http://www.w3.org/2000/svg" class=" flex flex-row bg-red-200 w-8 h-8 " viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V428.7c-2.7 1.1-5.4 2-8.2 2.7l-60.1 15c-3 .7-6 1.2-9 1.4c-.9 .1-1.8 .2-2.7 .2H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 381l-9.8 32.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.8 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8h8.9c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7L384 203.6V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM549.8 139.7c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM311.9 321c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L512.1 262.7l-71-71L311.9 321z"/>
        </svg>
      </div>
      <div v-else>
        <svg xmlns="http://www.w3.org/2000/svg" id="id-8-2-1" class=" flex flex-row bg-transparent w-8 h-8 " viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
          <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM216 408c0 13.3-10.7 24-24 24s-24-10.7-24-24V305.9l-31 31c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l72-72c9.4-9.4 24.6-9.4 33.9 0l72 72c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-31-31V408z" />
        </svg>
      </div>
    </ToolBarButton>
    <ToolBarButton target="openProjectForm" title="Open project">
      <svg xmlns="http://www.w3.org/2000/svg" id="id-8-3-1" class=" flex flex-row bg-transparent w-8 h-8 " viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
        <path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z" />
      </svg>
    </ToolBarButton>
    <ToolBarButton target="exportProjectForm" title="Generate project code">
      <svg xmlns="http://www.w3.org/2000/svg" id="id-8-4-1" class=" flex flex-row bg-transparent w-8 h-8 " viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" />
      </svg>
    </ToolBarButton>
    <ToolBarButton target="issuesForm" title="Report issues">
      <svg xmlns="http://www.w3.org/2000/svg" id="id-8-5-1" class=" flex flex-row bg-transparent w-8 h-8 " viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2023 Fonticons, Inc. -->
        <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L477.4 348.9c1.7-9.4 2.6-19 2.6-28.9h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H479.7c-1.1-14.1-5-27.5-11.1-39.5c.7-.6 1.4-1.2 2.1-1.9l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-.7 .7-1.3 1.4-1.9 2.1C409.2 164.1 393.1 160 376 160H264c-8.3 0-16.3 1-24 2.8L38.8 5.1zM320 0c-53 0-96 43-96 96v3.6c0 15.7 12.7 28.4 28.4 28.4H387.6c15.7 0 28.4-12.7 28.4-28.4V96c0-53-43-96-96-96zM160.3 256H96c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c0 24.6 5.5 47.8 15.4 68.6c-2.2 1.3-4.2 2.9-6 4.8l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l63.1-63.1c24.5 21.8 55.8 36.2 90.3 39.6V335.5L166.7 227.3c-3.4 9-5.6 18.7-6.4 28.7zM336 479.2c36.6-3.6 69.7-19.6 94.8-43.8L336 360.7V479.2z" />
      </svg>
    </ToolBarButton>
  </ToolBar>
  <div class="flex">
    <div class="w-96 h-screen bg-slate-50 z-40">
      <div class="flex bg-slate-600 text-white">
        <div class="ml-2 w-10/12">Components</div>
        <button type="button" class="text-white w-5 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium text-sm dark:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-slate-800" @click.stop="createNewComponent">
          <svg id="Layer_1" data-name="Layer 1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 100.06"><title>Add component</title><path class="cls-1" d="M50.34,34.25h5.39a2.49,2.49,0,0,1,2.48,2.48v8h8a2.51,2.51,0,0,1,2.48,2.48v5.4a2.52,2.52,0,0,1-2.48,2.48h-8v8a2.51,2.51,0,0,1-2.48,2.48H50.34a2.51,2.51,0,0,1-2.49-2.48v-8h-8a2.5,2.5,0,0,1-2.48-2.48v-5.4a2.48,2.48,0,0,1,2.48-2.48h8v-8a2.49,2.49,0,0,1,2.49-2.48ZM7.67,0H98.35A7.69,7.69,0,0,1,106,7.67v68a7.7,7.7,0,0,1-7.67,7.67H7.67A7.69,7.69,0,0,1,0,75.69v-68A7.69,7.69,0,0,1,7.67,0ZM99.05,23.92H7.31V74a2.09,2.09,0,0,0,.62,1.5,2.13,2.13,0,0,0,1.51.62H96.89a2.11,2.11,0,0,0,1.51-.62A2.09,2.09,0,0,0,99,74V23.92ZM91,8.62a3.79,3.79,0,1,1-3.79,3.79A3.79,3.79,0,0,1,91,8.62Zm-25.68,0a3.79,3.79,0,1,1-3.79,3.79,3.79,3.79,0,0,1,3.79-3.79Zm12.84,0a3.79,3.79,0,1,1-3.79,3.79A3.79,3.79,0,0,1,78.2,8.62Zm37,8.07.36,23.92V90.69a2.12,2.12,0,0,1-2.13,2.13H26a2.12,2.12,0,0,1-2.12-2.13h-7v1.68a7.7,7.7,0,0,0,7.67,7.68h90.68a7.7,7.7,0,0,0,7.67-7.68v-68a7.7,7.7,0,0,0-7.67-7.68Z"/></svg>
        </button>
      </div>
      <ItemTypeMenu v-if="selectingChildType" :components="project.components" @cancel="cancelAddItem" @selected="addItem"></ItemTypeMenu>
      <div v-for="component in project.components">
        <div>
          <EditableLabel 
            :text="component.name" 
            @select="selectComponent(component)" 
            @remove="removeComponent(component)"
            @update:text="value => updateComponent(component, 'name', value)"
            validator="[A-Z][A-Za-z0-9\-]*"
            class="pl-2">
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
import { debug } from '@/lib/logger.js'
import { getComponentRenderedClass } from '@/lib/ClassGeneration.js'
import { getNextId } from '@/lib/IdGeneration.js'
import { getItemById, findClassBy, findOrCreateClassBy, clone, copy, removeItemFrom } from '@/lib/EditorUtils.js'
import { printTree } from '@/lib/DebugUtils.js'
import { toHtml } from '@/lib/HtmlExporter.js'
import { AccountServiceProxy } from '@/lib/accounts/ServiceProxy.js'
import { getSpacingVariables } from '@/lib/plugins/spacing.js'
import { getTypographyVariables } from '@/lib/plugins/typography.js'
import { getTransformVariables } from '@/lib/plugins/transform.js'
import { getTransitionVariables } from '@/lib/plugins/transition.js'
import { getPaddingVariables } from '@/lib/plugins/padding.js'
import { getMarginVariables } from '@/lib/plugins/margin.js'
import { getFlexVariables } from '@/lib/plugins/flex.js'
import { getBorderVariables } from '@/lib/plugins/border.js'
import { getGradientVariables } from '@/lib/plugins/gradient.js'

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

definePageMeta({
  middleware: [
    'auth',
  ],
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
    modifier: 'unset',

    backgroundColor: 'unset',
    width: 'unset',
    height: 'unset',

    display: 'unset',

    gap: 'unset', 
    justifyContent: 'unset',
    justifyItems: 'unset',
    justifySelf: 'unset',

    alignContent: 'unset',
    alignItems: 'unset',
    alignSelf: 'unset',

    placeContent: 'unset',
    placeItems: 'unset',
    placeSelf: 'unset',

    shadow: 'unset',
    shadowColor: 'unset',

    divideColor: 'unset',
    outlineColor: 'unset',
    ringColor: 'unset',

    animation: 'unset',

    fillColor: 'unset',
  }],
}

function addTemplateVariables(template, variables) {
  Object.keys(variables).forEach(name => {
    itemTemplate.classes[0][name] = variables[name]
  })
}

const plugins = [
  getSpacingVariables,
  getPaddingVariables,
  getMarginVariables,
  getTypographyVariables,
  getBorderVariables,
  getFlexVariables,
  getTransformVariables,
  getTransitionVariables,
  getGradientVariables,
]

plugins.forEach(plugin => {
  addTemplateVariables( itemTemplate, plugin() )
})

const accessToken = useCookie('access_token', undefined)
const refreshToken = useCookie('refresh_token', undefined)

const currentUser = useStorage('user', {
  name: 'anonimous',
  email: 'undefined',
  id: 'undefined',
  licence: 'community',
  maxProjects: '1'
})

function updateUser(account) {
  currentUser.value = account
}

const currentProject = useStorage('currentProject', {
  name: 'Default',
  dirty: false,
  components: [],
})

const project = ref({
  name: 'Default',
  dirty: false,
  components: [],
})

const selectedComponent = ref(null)
const selectedItem = ref(null)

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

createNewProject({ name: 'Default' })

function initProject(projectValue) {
  selectComponent(projectValue.components[0])
  selectDevice('any')
  selectMode('light')
  projectValue.dirty = false
}

function newProject(data) {
  const project = {
    name: data.name,
    components: []
  }
  project.components.push(newComponent())
  return project 
}

function createNewProject( data ) {
  project.value = newProject(data)
  initProject(project.value)
}

function openProject(projectValue) {
  project.value = projectValue
  initProject(projectValue)
}

const throttledSave = throttle(saveModel, 5*1000)

function saveProject() {
  // debug('SAVING: ' + project.value.components[0].name)
  // debug('CURRENT: ' + selectedComponent.value.name)
  // debug('CURRENT USER: ' + currentUser.value.id)
  if (currentUser.value.id === 'undefined') return
  project.value.dirty = false
  project.value.userId = currentUser.value.id
  throttledSave(project.value)
}

function dirtyProject() {
  project.value.dirty = true
}

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

async function generateNuxtTailwindsStorybook() {
  const result = await postToServer( { project: project.value, user: currentUser.value }, `${config.public.apiBase}/generation`)
  // debug(result.data)
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
  component.id = getNextId(project.value.components).toString()
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

watch([project, selectedComponent, selectedItem], (newValue, olddirtyProjectValue) => dirtyProject())

function createNewComponent() {
  const component = newComponent()
  project.value.components.push(component)
  selectComponent(component)
  dirtyProject()
}

function removeComponent(componentToDelete) {
  if (project.value.components.length < 2) return
  project.value.components = project.value.components.filter( component => component.id !== componentToDelete.id )
  if (componentToDelete.id === selectedComponent.value.id ) {
    selectComponent(project.value.components[0])
  }
  dirtyProject()
}

function updateComponent(component, propertyName, value) {
  component[propertyName] = value
  dirtyProject()
}

function selectComponent(component) {
  selectedComponent.value = component
  selectItem(selectedComponent.value.root)
}

const treeViewBackground = computed(() => selectedMode.value==='light' ? 'bg-white': 'bg-black' )
const treeViewContainerClass = computed(() => `${selectedMode.value==='light' ? 'bg-white': 'bg-black'} ${selectedDeviceWidth[selectedDevice.value]} flex align-middle shadow-lg justify-center h-screen`)

function printClassKey({ mode, device, modifier }) {
  // debug(`key: "${mode}:${device}:${modifier}"`)
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

  item.type = modifiedItem.type
  item.props = modifiedItem.props
 
  const editedClass = findClassBy(item, getClassKey( modifiedItem.currentClass ) )

  copy(modifiedItem.currentClass, editedClass)
  // item.classes = modifiedItem.classes
  item.renderedClass = getComponentRenderedClass(item)

  selectedItem.value.item

  refreshTreeView.value = ! refreshTreeView.value  // this forces the selectedItem view refresh
  dirtyProject()
}

function removeItem(node) {
  if (node.id === '1') return; // root can not be removed
  removeItemFrom(selectedComponent.value.root, node)
  dirtyProject()
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
  newItem.currentClass.modifier = 'unset' // selectedItem.value.currentClass.modifier
  
  newItem.id = `${parentForNewChild.value.id}-${parentForNewChild.value.children.length + 1}`,
  newItem.editorId = newItem.id
  newItem.type = type.name
  newItem.props = newProps(type.props)
  newItem.needsResolve = type.needsResolve
  parentForNewChild.value.children.push(newItem)
  closeSelectTypeDialog()
  selectItem(newItem)
  dirtyProject()
}

function selectItem(item) {
  if (selectedItem.value) {
    selectedItem.value.isSelected = false
  }
  
  selectedItem.value = item
  selectedItem.value.currentClass = findOrCreateClassBy(item, selectedDevice.value, selectedMode.value, 'unset' /*item.currentClass.modifier */)
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

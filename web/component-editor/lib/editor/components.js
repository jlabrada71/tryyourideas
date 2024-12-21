import { clone } from '@/lib/editor/utils.js'
import { getNextId } from '@/lib/IdGeneration.js'
import { plugins } from '@/lib/plugins/registry.js'

const itemTemplate = {
  name: 'div',
  type: 'div',
  properties: [],
  children: [],
  text: '',
  editorClass: '',
  renderedClass: '',
  classes: [{
    device: 'any',
    mode: 'light',
    modifier: 'unset',
  }],
}

function addTemplateVariables(template, variables) {
  Object.keys(variables).forEach(name => {
    itemTemplate.classes[0][name] = variables[name]
  })
}

plugins.forEach(plugin => {
  addTemplateVariables( itemTemplate, plugin.getVariables() )
})

export function createNewComponent(project) {
  const component = {
    name: 'Component',
    isComponent: true,
    root: clone(itemTemplate),
    properties: [],
    variables: [],
    events: []
  }
  component.id = getNextId(project.components).toString()
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

function initializeProp(prop) {
  return { ...prop, value: prop.default }
}

function newProps(properties) {
  return properties.map(prop => initializeProp(prop))
}

export function getNextChildId(parent) {
  const count = ( parent.childIdCount || 0 ) + 1
  parent.childIdCount = count
  return `${parent.id}-${count}`
}

export function recalculateChildrenIds(parent) {
  parent.childIdCount = 0
  if (parent.children.length === 0 ) return
  parent.children.forEach(child => {
    child.id = getNextChildId(parent)
    recalculateChildrenIds(child)
  })
}

export function createNewItem(type, id) {
  const newItem = clone(itemTemplate)
  newItem.currentClass = newItem.classes[0]
  initializeItemClass(newItem.currentClass)
  newItem.currentClass.modifier = 'unset' // selectedItem.value.currentClass.modifier
  newItem.id = id
  newItem.editorId = newItem.id
  newItem.type = type.name
  newItem.isComponent = type.isComponent
  newItem.definition = type
  newItem.properties = newProps(type.properties)
  newItem.needsResolve = type.needsResolve
  return newItem
}

function initializeComponentClass(componentClass) {
  componentClass.width = 'w-full'
  componentClass.height = 'h-40'
  componentClass.backgroundColor = 'bg-slate-200'
  componentClass.display = 'flex'
  componentClass.flexDirection = 'flex-row'
}

function initializeItemClass(itemClass) {
  itemClass.width = 'w-10'
  itemClass.height = 'h-10'
  itemClass.backgroundColor = 'bg-slate-300'
  itemClass.display = 'flex'
  itemClass.flexDirection = 'flex-row'
}
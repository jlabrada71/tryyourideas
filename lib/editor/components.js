import { clone } from '@/lib/editor/utils.js'
import { getNextId } from '@/lib/IdGeneration.js'
import { getSpacingVariables } from '@/lib/plugins/spacing.js'
import { getTypographyVariables } from '@/lib/plugins/typography.js'
import { getTransformVariables } from '@/lib/plugins/transform.js'
import { getTransitionVariables } from '@/lib/plugins/transition.js'
import { getPaddingVariables } from '@/lib/plugins/padding.js'
import { getMarginVariables } from '@/lib/plugins/margin.js'
import { getFlexVariables } from '@/lib/plugins/flex.js'
import { getBorderVariables } from '@/lib/plugins/border.js'
import { getGradientVariables } from '@/lib/plugins/gradient.js'
import { getAnimationVariables } from '@/lib/plugins/animation.js'
import { getJustifyVariables } from '@/lib/plugins/justify.js'
import { getAlignVariables } from '@/lib/plugins/align.js'
import { getPlaceVariables } from '@/lib/plugins/place.js'
import { getShadowVariables } from '@/lib/plugins/shadow.js'
import { getOutlineVariables } from '@/lib/plugins/outline.js'
import { getRingVariables } from '@/lib/plugins/ring.js'
import { getDivideVariables } from '@/lib/plugins/divide.js'
import { getBackgroundVariables } from '@/lib/plugins/background.js'

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

    backgroundColor: 'unset',
    width: 'unset',
    height: 'unset',

    display: 'unset',

    gap: 'unset', 

    fillColor: 'unset',
    accentColor: 'unset'
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
  getAnimationVariables,
  getJustifyVariables,
  getAlignVariables,
  getPlaceVariables,
  getShadowVariables,
  getOutlineVariables,
  getRingVariables,
  getDivideVariables,
  getBackgroundVariables
]

plugins.forEach(plugin => {
  addTemplateVariables( itemTemplate, plugin() )
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


export function createNewItem(type, parent) {
  const newItem = clone(itemTemplate)
  newItem.currentClass = newItem.classes[0]
  initializeItemClass(newItem.currentClass)
  newItem.currentClass.modifier = 'unset' // selectedItem.value.currentClass.modifier
  const count = ( parent.childIdCount || 0 ) + 1
  parent.childIdCount = count
  newItem.id = `${parent.id}-${count}`
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
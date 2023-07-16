import { debug, log } from '@/lib/logger.js'
import { createNewComponent } from '@/lib/editor/components.js'
import { getBackgroundVariables } from '@/lib/plugins/background.js'

const variablesGetter = [
  getBackgroundVariables
]

export function migrateVariables(variables, cls) {
  for (const variable in variables) {
    if (cls[variable] === undefined) {
      cls[variable] = variables[variable]
    }
  }
}

function migrateProperties(item) {
  item.properties = item.props || item.properties
  item.props = undefined
}

export function migrateClasses(item) {
  item.classes.forEach(cls => {
    variablesGetter.forEach( variableGetter => migrateVariables( variableGetter(), cls))
  })
}

function migrateItems(item) {
  item.children.forEach(migrateItems)
  migrateClasses(item)
  migrateProperties(item)
}

export function migrateProject(project) {
  debug('migrateProject')
  if (project.version?.startsWith('0.15')) {
    return // already migrated
  }
  debug('Migrating')
  
  project.version = '0.15'
  project.components.forEach( migrateProperties  )
  project.components.forEach( component => migrateItems(component.root) )
  project.variables = []
}

export function addComponent(project, component) {
  project.components.push(component)
}

export function getCleanProject() {
  const cleanProject = {
    name: 'Default',
    dirty: false,
    components: [],
  }

  addComponent(cleanProject, createNewComponent(cleanProject))
  
  return cleanProject
}

import { debug, log } from '@/lib/logger.js'

function migrateProperties(item) {
  item.properties = item.props || item.properties
  item.props = undefined
}

function migrateItems(item) {
  item.children.forEach(migrateItems)
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

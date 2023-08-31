import { debug, log } from '@/lib/logger.js'
import { createNewComponent } from '@/lib/editor/components.js'
import { getBackgroundVariables } from '@/lib/plugins/background.js'
import { clone } from '@/lib/editor/utils.js'

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

const defaultTheme = {
  colors: {
    primary: {
      25: '#cdd3d6',
      50: '#243d48',
      75: '#1b2d36'
    },
    secondary: {
      25: '#bfe1ec',
      50: '#0086b2',
      75: '#006485'
    },
    success: {
      25: '#ecfdf5',
      50: '#10b981',
      75: '#065f46'
    },
    warning: {
      25: '#fffbeb',
      50: '#f59e0b',
      75: '#92400e'
    },
    error: {
      25: '#fef2f2',
      50: '#ef4444',
      75: '#991b1b'
    },
    title: {
      1: '#000',
      2: '#a3a3a3',
      3: '#000',
      4: '#0e7490'
    }
  },
  fontSize: {
    button: '1rem',
    'size-title1': '2rem',
    'size-title2': '1.5rem',
    'size-title3': '1.25rem',
    'size-title4': '1.125rem'
  },
  fontWeight: {
    'weight-button': '400',
    'weight-title1': '700',
    'weight-title2': '700',
    'weight-title3': '400',
    'weight-title4': '400'
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

function migrateComponent(component) {
  migrateProperties(component)
  migrateItems(component.root)
  if (!component.category) {
    component.category = 'Components'
  }
}

export function migrateProject(project) {
  debug('migrateProject')
  if (project.version?.startsWith('0.30')) {
    return // already migrated
  }
  debug('Migrating')
  
  project.version = '0.30'
  project.components.forEach( migrateComponent  )
  project.variables = []
  project.theme = clone(defaultTheme)
  project.componentCategories = ['Components']
  project.designTokenCategories = []
  project.designTokens = []
}

export function addComponent(project, component) {
  project.components.push(component)
}

export function getCleanProject({ name = 'Default' }) {
  const cleanProject = {
    name: name,
    dirty: false,
    designTokens: [],
    theme: clone(defaultTheme),
    components: [],
    componentCategories: [],
    designTokenCategories: []
  }

  addComponent(cleanProject, createNewComponent(cleanProject))
  
  return cleanProject
}

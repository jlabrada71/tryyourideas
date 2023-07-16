
import { 
  migrateClasses,
  migrateVariables
 } from '@/lib/editor/projects.js'

import { getBackgroundVariables } from '@/lib/plugins/background.js'


describe('migrate function', () => {
  describe('migrate a variable', () => {
    const cls = {

    }

    migrateVariables(getBackgroundVariables(), cls)
    it ('should set to "unset"', () => {
      expect(cls.backgroundClip).toBe('unset')
    })
  })
  describe('migrate all the classes', () => {
    const item = {
      classes: [
        {

        }
      ]
    }

    migrateClasses(item)
    it(' should be "this is a test"', () => {
      expect(item.classes[0].backgroundClip).toBe('unset')
    })
  })
})


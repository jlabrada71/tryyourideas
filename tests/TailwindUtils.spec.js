
import { compileTailwindClasses } from '@/lib/tailwind-utils.js'
  
describe('send function', () => {
  describe('given a body calls the email sender send function with the body', () => {
    const classes = ["m-5", "p-10", "bg-primary-25"]
    const theme = {
      colors: {
        primary: {
          25: '#cdd3d6',
          50: '#243d48',
          75: '#1b2d36'
        }
      }
    }

    it (' should be "this is a test"', async () => {
      const expectedText = `! tailwindcss v3.3.2 | MIT License | https://tailwindcss.com`
      const css = await compileTailwindClasses({ classes, theme })
      expect(css).toContain(expectedText)
    })
  })
})


import { removeRelativePath } from '@/lib/url-utils.js'

function getBackgroundImage(image) {
  if (image === 'unset' ) {
    return 'unset'
  }
  return `bg-[url(${removeRelativePath(image)})]`
}

export function generateBackground(itemClass, f) {
  return ` ${f(itemClass.backgroundClip )}  
          ${f(itemClass.backgroundSize )} 
          ${f(itemClass.backgroundOrigin )}  
          ${f(itemClass.backgroundPosition )} 
          ${f(itemClass.backgroundAttachment )}  
          ${f(itemClass.backgroundRepeat )} 
          ${f(getBackgroundImage(itemClass.backgroundImage))}`
}

export function getBackgroundVariables() {
  return {
    backgroundClip: 'unset',
    backgroundImage: 'unset',
    backgroundSize: 'unset',
    backgroundAttachment: 'unset',
    backgroundOrigin: 'unset',
    backgroundPosition: 'unset',
    backgroundRepeat: 'unset',
  }
}

export const backgroundPlugin = {
  generator: generateBackground, 
  getVariables: getBackgroundVariables
}
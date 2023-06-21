export function generateTransition(itemClass, f) {
  return `${f(itemClass.transition)} 
  ${f(itemClass.transitionDuration)} 
  ${f(itemClass.transitionTiming)} 
  ${f(itemClass.transitionDelay)}`
}

export function getTransitionVariables() {
  return {
    transition: 'unset',
    transitionDuration: 'unset',
    transitionTiming: 'unset',
    transitionDelay: 'unset',
  }
}
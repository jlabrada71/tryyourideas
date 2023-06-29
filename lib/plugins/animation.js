export function generateAnimation(itemClass, f) {
  return ` ${f(itemClass.animation )}`
}

export function getAnimationVariables() {
  return {
    animation: 'unset',
  }
}
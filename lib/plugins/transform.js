export function generateTransform(itemClass, f) {
  return ` ${f(itemClass.transformScale )}
   ${f(itemClass.transformRotate )} 
   ${f(itemClass.transformTranslate )} 
   ${f(itemClass.transformSkew )} 
   ${f(itemClass.transformOrigin )}`
}

export function getTransformVariables() {
  return {
    transformScale: 'unset',
    transformRotate: 'unset',
    transformTranslate: 'unset',
    transformSkew: 'unset',
    transformOrigin: 'unset',
  }
}
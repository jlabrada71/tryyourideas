export function generateFilters(itemClass, f) {
  return `
  ${f(itemClass.alignContent)}  
  ${f(itemClass.filterBlur)}
  ${f(itemClass.filterContrast)}
  ${f(itemClass.filterDropShadow)}
  ${f(itemClass.filterGrayscale)}
  ${f(itemClass.filterHueRotate)}
  ${f(itemClass.filterInvert)}
  ${f(itemClass.filterSaturate)}
  ${f(itemClass.filterSepia)}
  ${f(itemClass.backdropBlur)}
  ${f(itemClass.backdropBrightness)}
  ${f(itemClass.backdropContrast)}
  ${f(itemClass.backdropGrayscale)}
  ${f(itemClass.backdropHueRotate)}
  ${f(itemClass.backdropInvert)}
  ${f(itemClass.backdropOpacity)}
  ${f(itemClass.backdropSaturate)}
  ${f(itemClass.backdropSepia)} 
  `
}

export function getFiltersVariables() {
  return {
    filterBlur: 'unset',
    filterContrast: 'unset',
    filterDropShadow: 'unset',
    filterGrayscale: 'unset',
    filterHueRotate: 'unset',
    filterInvert: 'unset',
    filterSaturate: 'unset',
    filterSepia: 'unset',
    backdropBlur: 'unset',
    backdropBrightness: 'unset',
    backdropContrast: 'unset',
    backdropGrayscale: 'unset',
    backdropHueRotate: 'unset',
    backdropInvert: 'unset',
    backdropOpacity: 'unset',
    backdropSaturate: 'unset',
    backdropSepia: 'unset'
  }
}

export const filtersPlugin = { 
  generator: generateFilters, 
  getVariables: getFiltersVariables 
} 
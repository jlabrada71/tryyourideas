<template>
  <!-- http://localhost:3000/tests/class-creator -->
<!-- <DivClassGenerator :tags="transitionsTags" :values="transitions"></DivClassGenerator>
<DivClassGenerator :tags="transitionsTimesTags" :values="transitionsTimes"></DivClassGenerator>
<DivClassGenerator :tags="transitionsTimingsTags" :values="transitionsTimings"></DivClassGenerator>
<DivClassGenerator :tags="animationsTags" :values="animations"></DivClassGenerator> -->

<!-- <DivClassGenerator :tags="transformScaleTags" :values="transformScales"></DivClassGenerator>
<DivClassGenerator :tags="transformRotateTags" :values="transformRotates"></DivClassGenerator>
<DivClassGenerator :tags="transformTranslateTags" :values="transformTranslate"></DivClassGenerator>
<DivClassGenerator :tags="transformOriginTags" :values="transformOrigin"></DivClassGenerator>
<DivClassGenerator :tags="transformSkewTags" :values="transformSkew"></DivClassGenerator> -->

<!-- <DivClassGenerator :tags="marginTags" :values="margins"></DivClassGenerator>  -->
<!-- 
<DivColorClassGenerator :tags="colorTags" :values="colorNames" :values2="colorValues"></DivColorClassGenerator>  -->

<!-- <DivClassGenerator :tags="gradientDirectionTags" :values="gradientDirection"></DivClassGenerator> -->

<!-- <DivClassGenerator :tags="sizeTags" :values="sizeValues"></DivClassGenerator> -->

<!-- <DivClassGenerator :tags="animationTags" :values="animation"></DivClassGenerator> -->

<!-- <DivClassGenerator :tags="outlineTags" :values="outlines"></DivClassGenerator> -->

<!-- <DivClassGenerator :tags="backgroundClipTags" :values="backgroundClip"></DivClassGenerator> -->
<!-- <DivClassGenerator :tags="colorTags" :values="colorsNames2"></DivClassGenerator> -->
<!-- <DivClassGenerator :tags="fontTags" :values="fontFamilies"></DivClassGenerator> -->
<!-- <DivClassGenerator :tags="fontTags" :values="fontWeights"></DivClassGenerator> -->
<!-- <DivClassGenerator :tags="textTags" :values="textAligns"></DivClassGenerator> -->
<!-- <DivClassGenerator :tags="textVerticalTags" :values="textVerticalAligns"></DivClassGenerator> -->
<!-- <DivClassGenerator :tags="textTrackingTags" :values="textTrackings"></DivClassGenerator> -->
<!-- <DivClassGenerator :tags="textLeadingTags" :values="textLeadings"></DivClassGenerator> -->
<!-- <DivClassGenerator :tags="displayTag" :values="display"></DivClassGenerator> -->
<!-- <DivClassGenerator :tags="borderWidthTags" :values="borderWidths"></DivClassGenerator>-->

<!-- <DivClassGenerator :tags="gapTags" :values="gaps"></DivClassGenerator>-->


<DivClassGenerator :tags="flexDirectionWrapTags" :values="flexDirectionWraps"></DivClassGenerator>

</template>
<script setup>
  import { ref } from 'vue'

  const props = defineProps(['color'])
  const emit = defineEmits(['update:color'])

  const colorTags = ['bg', 'text', 'shadow', 'border', 'divide', 'ring', 'outline', 'from', 'via', 'to', 'fill', 'accent']

  const colorNames = ref(['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 
'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'])
  const colorValues = ref([50, 100, 200, 300, 400, 500, 600, 700, 800, 900])

  const shadowValues =  ["sm", "md", "lg", "xl", "2xl", "inner", "none" ]
  
  const textSizeTags = ['text']
  const textSizes = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']

  const textTags = ['text']
  const textAligns =  [ 'left', 'center', 'right', 'justify', 'start', 'end']

  const textVerticalTags = ['align']
  const textVerticalAligns = [ 'baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super']

  const textTrackingTags = ['tracking']
  const textTrackings = [ 'tighter', 'tight', 'normal', 'wide', 'wider', 'widest']

  const textLeadingTags = ['leading']
  const textLeadings = [ 'none', 'tight', 'snug', 'normal', 'relaxed', 'loose', '3', '4', '5', '6', '7', '8', '9', '10']

  const fontTags = ['font']
  const fontWeights = [ 'thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black']
  const fontFamilies = [ 'sans', 'serif', 'mono']


  const sizeTags = ['w', 'h']
  const sizeValues = ['0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 
                 '1/2', 
                 '1/3', '2/3', 
                 '1/4', '2/4', '3/4', 
                 '1/5', '2/5', '3/5', '4/5', 
                 '1/6', '2/6', '3/6', '4/6', '5/6', 
                 '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12', '8/12', '9/12', '10/12', '11/12', 
                 'auto', 'full', 'screen', 'min', 'max', 'fit']

  const alignTags = ['text']
  const alignValues = ['left', 'center', 'right', 'justify', 'start', 'end']
  const alignFlexTags = ['content', 'items', 'self']
  const alignFlexValues = ['auto', 'normal', 'start', 'end', 'center', 'between', 'around', 'evenly', 'baseline', 'stretch']
 
  const borderRadiusTags = ['rounded']
  const borderRadius = [ "none", "sm", "md", "lg", "xl", "2xl", "3xl", "full", "t-none", "t-sm", "t", "t-md", "t-lg", "t-xl", "t-2xl", "t-3xl", "t-full", "r-none", "r-sm", "r", "r-md", "r-lg", "r-xl", "r-2xl", "r-3xl", "r-full", "b-none", "b-sm", "b", "b-md", "b-lg", "b-xl", "b-2xl", "b-3xl", "b-full", "l-none", "l-sm", "l", "l-md", "l-lg", "l-xl", "l-2xl", "l-3xl", "l-full", "tl-none	", "tl-sm	", "tl	", "tl-md	", "tl-lg	", "tl-xl	", "tl-2xl	", "tl-3xl	", "tl-full	", "tr-none	", "tr-sm	", "tr	", "tr-md	", "tr-lg	", "tr-xl	", "tr-2xl	", "tr-3xl	", "tr-full	", "br-none	", "br-sm	", "br	", "br-md	", "br-lg	", "br-xl	", "br-2xl	", "br-3xl	", "br-full	", "bl-none	", "bl-sm	", "bl	", "bl-md	", "bl-lg	", "bl-xl	", "bl-2xl	", "bl-3xl	", "bl-full" ]
  const borderStyleTags = ['border']
  const borderStyles = [ "solid", "dashed", "dotted", "double", "hidden", "none" ]
  const borderWidthTags = ['border']
  const borderWidths = [ "0", "2", "4", "8", "x-0", "x-2", "x-4", "x-8", "x", "y-0", "y-2", "y-4", "y-8", "y", "t-0", "t-2", "t-4", "t-8", "t", "r-0", "r-2", "r-4", "r-8", "r", "b-0", "b-2", "b-4", "b-8", "b", "l-0", "l-2", "l-4", "l-8", "l" ]
  
  const transitionsTags = ['transition']
  const transitions = ['none', 'all', 'colors', 'opacity', 'shadow', 'transform']
  const transitionsTimesTags = ['delay', 'duration']
  const transitionsTimes = ['0', '75', '100', '150', '200', '300', '500', '700', '1000']
  const transitionsTimingsTags = ['ease']
  const transitionsTimings = ['linear', 'in', 'out', 'in-out']
  const animationsTags = ['animate']
  const animations = ['none', 'spin', 'ping', 'pulse', 'bounce']
  
  const transformScaleTags = ['scale']
  const transformScales = ['0', 'x-0', 'y-0', '50', 'x-50', 'y-50', '75', 'x-75', 'y-75', '90', 'x-90', 'y-90', '95', 'x-95', 'y-95', '100', 'x-100', 'y-100', '105', 'x-105', 'y-105', '110', 'x-110', 'y-110', '125', 'x-125', 'y-125', '150', 'x-150', 'y-150']
  
  const transformRotateTags = ['rotate']
  const transformRotates = ['0', '1', '2', '3', '6', 'y-12', '45', '90', '180']
  
  const transformTranslateTags = ['translate']
  const transformTranslate = ['x-0', 'y-0', 'x-px', 'y-px', 'x-0.5', 'y-0.5', 'x-1', 'y-1', 'x-1.5', 'y-1.5', 'x-2', 'y-2', 'x-2.5', 'y-2.5', 'x-3', 'y-3', 'x-3.5', 'y-3.5', 'x-4', 'y-4', 'x-5', 'y-5', 'x-6', 'y-6', 'x-7', 'y-7', 'x-8', 'y-8', 'x-9', 'y-9', 'x-10', 'y-10', 'x-11', 'y-11', 'x-12', 'y-12', 'x-14', 'y-14', 'x-16', 'y-16', 'x-20', 'y-20', 'x-24', 'y-24', 'x-28', 'y-28', 'x-32', 'y-32', 'x-36', 'y-36', 'x-40', 'y-40', 'x-44', 'y-44', 'x-48', 'y-48', 'x-52', 'y-52', 'x-56', 'y-56', 'x-60', 'y-60', 'x-64', 'y-64', 'x-72', 'y-72', 'x-80', 'y-80', 'x-96', 'y-96', 'x-1/2', 'x-1/3', 'x-2/3', 'x-1/4', 'x-2/4', 'x-3/4', 'x-full', 'y-1/2', 'y-1/3', 'y-2/3', 'y-1/4', 'y-2/4', 'y-3/4', 'y-full']

  const transformOriginTags = ['origin']
  const transformOrigin = ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left']
 
  const transformSkewTags = ['skew']
  const transformSkew = [ 'x-0', 'y-0', 'x-1', 'y-1', 'x-2', 'y-2', 'x-3', 'y-3', 'x-6', 'y-6', 'x-12', 'y-12']

  const marginTags = ['m', 'mx', 'my', 'mt', 'mr', 'mb', 'ml']
  const margins = ['0', 'px', '0.5', '1',  '1.5','2',  '2.5',  '3', '3.5','4', '5', '6',  '7',  '8','9', '10', '11', '12', '14', '16', '20','24','28', '32', '36', '40','44','48', '52', '56',  '60', '64', '72',  '80', '96', 'auto']
  
  const gradientDirectionTags = ['bg-gradient']
  const gradientDirection = [ 'to-t', 'to-tr', 'to-r', 'to-br', 'to-b', 'to-bl', 'to-l', 'to-tl']

  const animationTags = ['animation']
  const animation = [ 'spin', 'bounce', 'ping', 'pulse']

  const outlineTags = ['outline-offset', 'outline']
  const outlines = ['0', '1', '2', '4', '8' ]

  const backgroundClipTags = ['bg-clip']
  const backgroundClip = [ "border", "padding", "content", "text" ]

  const colorsNames2 = ['transparent', 'white', 'black', 'inherit', 'current']

  const displayTag = [ 'display' ]
  const display = ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden']
  

  const gapTags = [ 'gap', 'gap-x', 'gap-y' ]
  const gaps = ['px', '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '72', '80', '96']
  
  const flexDirectionWrapTags = ['flex']
  const flexDirectionWraps = ['row', 'row-reverse', 'col', 'col-reverse', 'wrap', 'wrap-reverse', 'nowrap']

</script>
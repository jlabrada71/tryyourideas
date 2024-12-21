<template>
  <AccordionItem id="21">
    <template #head><span class="flex items-center">Main</span></template>
    <template #body>
      <div class="flex flex-col gap-1">
        <div class="flex gap-1"> 
          <label for="text-edit">Text</label>
          <input id="text-edit" 
                  class="bg-slate-100 w-52 rounded" 
                  type="text" 
                  :value="props.text"
                  @input="event => updateText(event.target.value)"
          >
        </div>
        <SelectorsDisplay  :display="cls.display" @update:display="value => updateClass('display', value)"></SelectorsDisplay>
        <SelectorsWidth  :width="cls.width" @update:width="value => updateClass('width', value)"></SelectorsWidth>
        <SelectorsHeight :height="cls.height" @update:height="value => updateClass('height', value)"></SelectorsHeight>
        <SelectorsMultiPaddingSelect 
          :top="cls.paddingTop"
          :left="cls.paddingLeft"
          :right="cls.paddingRight"
          :bottom="cls.paddingBottom"
          @update:values="values => updatePaddings(values)">
        </SelectorsMultiPaddingSelect>
        <SelectorsMultiMarginSelect 
          :top="cls.marginTop"
          :left="cls.marginLeft"
          :right="cls.marginRight"
          :bottom="cls.marginBottom"
          @update:values="values => updateMargins(values)">
        </SelectorsMultiMarginSelect>
        <!-- <SelectorsSpacing :spacing="cls.spacing" @update:spacing="value => updateClass('spacing', value)"></SelectorsSpacing> -->
        <SelectorsMultiSpacingSelect 
          :top="cls.spacingY"
          :left="cls.spacingX"
          right=""
          bottom=""
          @update:values="values => updateSpacings(values)">
        </SelectorsMultiSpacingSelect>
      </div>
    </template>
  </AccordionItem> 
</template>
<script setup>
  const props = defineProps({
    cls: {
      type: Object,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  })

  const emit = defineEmits(['update:cls', 'update:text'])

  function updateClass(name, value) {
    emit('update:cls', { name, value })
  }

  function updateText(value) {
    emit('update:text', value)
  }

  function updateMargins(values) {
  if (values.A) {
    updateClass('marginTop', values.A)
    updateClass('marginLeft', 'unset')
    updateClass('marginRight',  'unset')
    updateClass('marginBottom',  'unset')
  }
  if (values.Y) {
    updateClass('marginTop', values.Y)
    updateClass('marginLeft', values.X)
    updateClass('marginRight',  'unset')
    updateClass('marginBottom',  'unset')
  }
  if (values.T) {
    updateClass('marginTop', values.T)
    updateClass('marginLeft', values.L)
    updateClass('marginRight', values.R)
    updateClass('marginBottom', values.B)
  }
}

function updatePaddings(values) {
  if (values.A) {
    updateClass('paddingTop', values.A)
    updateClass('paddingLeft', 'unset')
    updateClass('paddingRight',  'unset')
    updateClass('paddingBottom',  'unset')
  }
  if (values.Y) {
    updateClass('paddingTop', values.Y)
    updateClass('paddingLeft', values.X)
    updateClass('paddingRight',  'unset')
    updateClass('paddingBottom',  'unset')
  }
  if (values.T) {
    updateClass('paddingTop', values.T)
    updateClass('paddingLeft', values.L)
    updateClass('paddingRight', values.R)
    updateClass('paddingBottom', values.B)
  }
}

function updateSpacings(values) {
  updateClass('spacingY', values.Y)
  updateClass('spacingX', values.X)
}

</script>
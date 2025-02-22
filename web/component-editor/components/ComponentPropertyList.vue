<template>
  <PropertyEditor 
    v-if="isEditingProperty" 
    :property="selectedProperty" 
    :message="message"
    @cancel:property="cancelEditProperty" 
    @update:property="updateProperty">
  </PropertyEditor>
  <div 
    
    class="bg-yellow-200 w-full flex-row flex "
    data-id="propertyList"
    >
    <div class="bg-slate-200 w-full p-2 content-start flex-row flex-wrap flex ">
      <div class="bg-slate-300 w-full h-8 p-1 flex-row flex hover:bg-slate-600 hover:text-slate-100"> 
        <span class="w-full">
          Properties
        </span>
        <button  
          type="button" 
          class="w-12 font-medium rounded-lg text-sm px-4" 
          @click.stop="addProperty">
          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 122.88 119.8">
            <title>Add Property</title>
            <path d="M23.59,0h75.7a23.63,23.63,0,0,1,23.59,23.59V96.21A23.64,23.64,0,0,1,99.29,119.8H23.59a23.53,23.53,0,0,1-16.67-6.93l-.38-.42A23.49,23.49,0,0,1,0,96.21V23.59A23.63,23.63,0,0,1,23.59,0ZM55.06,38.05a6.38,6.38,0,1,1,12.76,0V53.51H83.29a6.39,6.39,0,1,1,0,12.77H67.82V81.75a6.38,6.38,0,0,1-12.76,0V66.28H39.59a6.39,6.39,0,1,1,0-12.77H55.06V38.05ZM99.29,12.77H23.59A10.86,10.86,0,0,0,12.77,23.59V96.21a10.77,10.77,0,0,0,2.9,7.37l.28.26A10.76,10.76,0,0,0,23.59,107h75.7a10.87,10.87,0,0,0,10.82-10.82V23.59A10.86,10.86,0,0,0,99.29,12.77Z"/>
          </svg>
        </button>
      </div>
     
      <div v-for="property in props.properties" :key="property.name" 
        class="w-full h-8 items-center flex-row flex "
        @click="selectProperty(property)"
      >
        <span class="w-1/3 flex-row flex ">
          {{property.name}}
        </span>
        <span class="w-1/3 flex-row flex ">
          {{property.type}}
        </span>
        <span class="bg-slate-200 w-1/6 flex-row flex ">
          {{property.access}}
        </span>
        <button type="button" :class="buttonClass"  @click.stop="editProperty(property)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 506 511.95">
            <title>Edit Property</title>
            <path fill-rule="nonzero" d="M400.08 26.04c-1.82-1.81-3.72-3.14-5.7-3.97-1.89-.8-4.05-1.2-6.47-1.2-2.38 0-4.52.41-6.4 1.21-1.95.83-3.83 2.15-5.63 3.96l-36.73 36.73 104.11 104.57 37.22-37.22c1.55-1.54 2.69-3.29 3.44-5.18l.15-.38c.71-1.96 1.06-4.17 1.06-6.56 0-2.49-.4-4.82-1.22-6.89l-.22-.62c-.74-1.64-1.79-3.16-3.16-4.52l-80.45-79.93zM69.03 332.8l105.03 103.23 215.22-215.22-104.09-104.17L69.03 332.8zm86.27 113.97-96.28-94.62-27.86 99.15c-4.45 15.91-7.46 28.06-9.05 36.44 19.79-5.98 40.2-11.61 59.73-18.29 10.75-3.39 21.78-6.87 39.25-12.28l24.1-7.34 10.11-3.06zM402.45 2.91c4.5 1.89 8.61 4.69 12.3 8.37l80.45 79.93c3.35 3.33 5.9 7.12 7.68 11.27l.43.96c1.81 4.57 2.69 9.48 2.69 14.56 0 4.87-.8 9.56-2.45 13.97l-.23.63c-1.79 4.53-4.47 8.67-8.08 12.28l-44.64 44.6c-4.07 4.05-10.66 4.03-14.71-.04L317.04 70.11c-4.07-4.07-4.07-10.68 0-14.76l44.08-44.07c3.65-3.66 7.72-6.45 12.23-8.36C377.92.98 382.77 0 387.91 0c5.1 0 9.94.97 14.54 2.91zM174.77 462.66l-23.54 7.07-24.03 7.32c-30.42 9.57-60.67 18.96-91.16 28.28-10.56 3.19-17.58 5.27-20.89 6.17-1.41.4-2.83.54-4.3.39-6.12-.62-9.68-4.3-10.63-11.06-.33-2.28-.28-5.21.13-8.77 1.03-9 4.62-24.47 10.75-46.39l32.27-114.82c.5-1.78 1.43-3.33 2.66-4.55L277.79 94.52c4.07-4.07 10.68-4.07 14.76 0l118.84 118.97c4.05 4.07 4.03 10.65-.02 14.7l-231.66 231.7a10.373 10.373 0 0 1-4.94 2.77z"/>
          </svg>
        </button>
        <button type="button" :class="buttonClass"  @click.stop="deleteProperty(property)">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <title>Delete Property</title>
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>          
        </button>          
      </div>      
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  properties: {
    type: Array
  },
})
const emit = defineEmits(['update:properties'])

const color = 'bg-slate'

const isEditingProperty = ref(false)
const selectedProperty = ref(null)
const message = ref('')

const buttonClass = computed(() => `w-5 mx-2 hover:${color}-800  dark:${color}-600 dark:hover:${color}-700 font-medium rounded-lg text-sm`)

function addProperty() {
  const id = props.properties.reduce((a, v) => (v.id > a ? v.id : a) , 0) + 1
  selectedProperty.value = {
    id,
    name: 'propName',
    type: 'String',
    access: 'Write',
    isRequired: false,
    defaultValue: ''
  }
  isEditingProperty.value = true
}

function selectProperty(property) {
  // selecting has no effect
  // alert('selecting ' + property.name)
}

const previousValue = ref(null)

function editProperty(property) {
  previousValue.value = { ...property }
  selectedProperty.value = previousValue.value
  isEditingProperty.value = true
}

function deleteProperty(property) {
  const properties = props.properties.filter(prop => prop.id != property.id)
  emit( 'update:properties', properties )
}

function cancelEditProperty() {
  message.value = ''
  isEditingProperty.value = false
}

function findSameName(property) {
  return props.properties.find(prop => prop.id !== property.id && prop.name === property.name)
}

function updateProperty(property) {
  message.value = ''
  if (findSameName(property)) {
    message.value = 'Property Name Duplicated'
    return
  }
  isEditingProperty.value = false
  const item = props.properties.find(prop => prop.id === property.id )

  if (!item) {
    props.properties.push(property)
  } else {
    for(let key in property) {
      item[key] = property[key]
    }
  }
  emit( 'update:properties', props.properties )
}

</script>

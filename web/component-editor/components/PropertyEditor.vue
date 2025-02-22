<template>
  <div class="absolute top-40 left-96 w-96 h-auto  bg-slate-200 p-5 shadow-md rounded-2xl flex flex-col">
    <div class="flex flex-col gap-2">
      <div class="flex">
        <span>Id: {{property.id}}</span>
      </div>
      <div class="flex">
        <span class="w-20 px-2">Name</span>
        <input type="text" v-model="property.name">
      </div>
      <div class="flex">
        <span class="w-20 px-2">Type</span>
        <input type="text" list="propertyTypes" v-model="property.type">
        <datalist id="propertyTypes">
          <option value="String" />
          <option value="Number" />
          <option value="Boolean" />
          <option value="Array" />
          <option value="Object" />
        </datalist>

      </div>
      <div class="flex">
        <span class="w-20 px-2">Default</span>
        <input type="text" v-model="property.defaultValue">
      </div>
      <div class="flex">
        <span class="w-20 px-2">Write</span>
        <input 
          type="checkbox" 
          id="checkbox" 
          v-model="accessCheck" />
      </div>
      <div class="flex">
        <span class="w-20 px-2">Required</span>
        <input 
          type="checkbox" 
          id="checkbox" 
          v-model="property.isRequired" />
      </div>
    </div>
    <div v-if="props.message !== ''" class="w-full m-2 ">
      <span class="bg-white justify-center flex p-4 text-red-500">{{props.message}}</span>
    </div>
   
    <footer class="flex flex-row justify-around justify-self-end mt-5 bg-slate-100 w-full p-5">
      <button
        id="id-2-3-1"
        class="block   bg-slate-300  w-20 h-10 shadow-md rounded-2xl    hover:bg-slate-400  focus:bg-slate-400  active:bg-slate-300 active:shadow-none  "
        @click.stop="cancelEditProperty"
      >
        Cancel
      </button>
      <button class="block  bg-slate-300 w-20 h-10 shadow-md rounded-2xl hover:bg-slate-400 focus:bg-slate-400 active:bg-slate-300 active:shadow-none"
        @click.stop="acceptEditProperty"
      >
        Update
      </button>
    </footer>
  </div>
</template>
<script setup>
  const emit = defineEmits(['update:property', 'cancel:property'])
  const props = defineProps({
    property: {
      type: Object
    }, 
    message: {
      type: String
    }
  })

  const property = ref({
    id: 0,
    name: '',
    type: '',
    defaultValue: '',
    isRequired: '',
    access: ''
  })

  const accessCheck = computed({
    get() {
      return property.value.access === 'Write'
    }, 
    set(value) {
      property.value.access = value ? 'Write' : 'Read'
    }
  })

  watchEffect(() => {
    property.value.id = props.property.id
    property.value.name =  props.property.name
    property.value.type = props.property.type
    property.value.access = props.property.access
    property.value.isRequired = props.property.isRequired
    property.value.defaultValue = props.property.defaultValue
  })

  function cancelEditProperty() {
    emit('cancel:property' )

  }

  function updateAccess(value) {
    console.log(value)
  }

  function acceptEditProperty() {
    emit('update:property', property.value )
  }

</script>
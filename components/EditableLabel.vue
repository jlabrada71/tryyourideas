<template>
  <div :class="labelClass" @click.stop="select">
    <input v-if="isEditing" type="text" ref="inputButton" v-model="editingText" @blur="handleBlur" :class="inputClass">
    <div v-else class="w-10/12">{{editingText}}</div>
    <div class="hidden justify-self-end group-hover:block group-focus:block">
      <div v-if="!isEditing">  
        <div class="flex justify-self-end gap-4">
          <button type="button" :class="buttonClass"  @click.stop="edit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 506 511.95">
              <title>Change name</title>
              <path fill-rule="nonzero" d="M400.08 26.04c-1.82-1.81-3.72-3.14-5.7-3.97-1.89-.8-4.05-1.2-6.47-1.2-2.38 0-4.52.41-6.4 1.21-1.95.83-3.83 2.15-5.63 3.96l-36.73 36.73 104.11 104.57 37.22-37.22c1.55-1.54 2.69-3.29 3.44-5.18l.15-.38c.71-1.96 1.06-4.17 1.06-6.56 0-2.49-.4-4.82-1.22-6.89l-.22-.62c-.74-1.64-1.79-3.16-3.16-4.52l-80.45-79.93zM69.03 332.8l105.03 103.23 215.22-215.22-104.09-104.17L69.03 332.8zm86.27 113.97-96.28-94.62-27.86 99.15c-4.45 15.91-7.46 28.06-9.05 36.44 19.79-5.98 40.2-11.61 59.73-18.29 10.75-3.39 21.78-6.87 39.25-12.28l24.1-7.34 10.11-3.06zM402.45 2.91c4.5 1.89 8.61 4.69 12.3 8.37l80.45 79.93c3.35 3.33 5.9 7.12 7.68 11.27l.43.96c1.81 4.57 2.69 9.48 2.69 14.56 0 4.87-.8 9.56-2.45 13.97l-.23.63c-1.79 4.53-4.47 8.67-8.08 12.28l-44.64 44.6c-4.07 4.05-10.66 4.03-14.71-.04L317.04 70.11c-4.07-4.07-4.07-10.68 0-14.76l44.08-44.07c3.65-3.66 7.72-6.45 12.23-8.36C377.92.98 382.77 0 387.91 0c5.1 0 9.94.97 14.54 2.91zM174.77 462.66l-23.54 7.07-24.03 7.32c-30.42 9.57-60.67 18.96-91.16 28.28-10.56 3.19-17.58 5.27-20.89 6.17-1.41.4-2.83.54-4.3.39-6.12-.62-9.68-4.3-10.63-11.06-.33-2.28-.28-5.21.13-8.77 1.03-9 4.62-24.47 10.75-46.39l32.27-114.82c.5-1.78 1.43-3.33 2.66-4.55L277.79 94.52c4.07-4.07 10.68-4.07 14.76 0l118.84 118.97c4.05 4.07 4.03 10.65-.02 14.7l-231.66 231.7a10.373 10.373 0 0 1-4.94 2.77z"/>
            </svg>
          </button>
          <button type="button" :class="buttonClass"  @click.stop="remove">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
              <title>Delete component</title>
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </button>
        </div> 
      </div>
      <div v-if="isEditing">  
        <div class="flex justify-self-end gap-4">
          <button type="button" :class="textButtonClass"  @click.stop="cancel">
            Cancel
          </button>
          <button type="button" :class="textButtonClass"  @click.stop="change">
            Ok
          </button>
        </div>          
      </div>        
    </div>
  </div>
</template>
<script setup>
  const emit = defineEmits(['update:text', 'select', 'remove'])

  const props = defineProps({
    text: {
      type: String
    },
    bgcolor: {
      type: String,
      default: 'bg-red'
    },
    color: {
      type: String,
      default: 'text-slate'
    },
    validator: {
      type: String,
      default: '[A-Za-z0-9 \.]*'
    }
  })

  const inputButton = ref(null)

  const isEditing = ref(false)
  const previousValue = ref('')

  const editingText = computed({
    get() {
      return props.text
    },
    set(value) {
      emit('update:text', value)
    }
  })

  const labelClass = computed(() => `flex flex-row group ${props.bgcolor}-600 ${props.color}-100`)
  const inputClass = computed(() => `w-10/12 ${props.bgcolor}-400`)
  const buttonClass = computed(() => `w-5 mx-2 hover:${props.bgcolor}-800  dark:${props.bgcolor}-600 dark:hover:${props.bgcolor}-700 font-medium rounded-lg text-sm`)
  const textButtonClass = computed(() => `w-15 mx-2 hover:${props.bgcolor}-800  dark:${props.bgcolor}-600 dark:hover:${props.bgcolor}-700 font-medium rounded-lg text-sm`)


  async function edit() {
    // console.log('editing ')
    isEditing.value = true
    previousValue.value = props.text
    await nextTick()
    inputButton.value.focus()
  }

  function cancel() {
    editingText.value = previousValue.value
    isEditing.value = false
  }

  function isValid(text) {
    const regex = new RegExp(props.validator)
    const match = regex.exec(text);
    // console.log(`validating '${text}' using: ${props.validator}`)
    // console.log(match)
    return match && match[0] === text
  }

  function change() {
    if (!isValid(props.text)) {
      // console.log('Not match')
      inputButton.value.focus()
      return;
    }

    isEditing.value = false
  }

  function remove() {
    emit('remove')
  }

  function select() {
    emit('select')
  }

  function handleBlur() {
    change()
  }

</script>
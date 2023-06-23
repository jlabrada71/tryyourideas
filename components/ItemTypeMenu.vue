<template>
  <div class="absolute top-20 left-72 w-80 h-auto  bg-slate-200 p-5 shadow-md rounded-2xl flex flex-col">

    <div class="flex flex-row"><ItemTypeTab @selected:category="selectHtml5">Html 5</ItemTypeTab><ItemTypeTab @selected:category="selectProject">Project</ItemTypeTab></div>
    <ItemTypeHtml5 v-if="html5Tab.active" @select="selectType"></ItemTypeHtml5>
    <ItemTypeProject  v-if="projectTab.active" :components="props.components" @select="selectType"></ItemTypeProject>
    <footer
      id="id-2-3"
      class="
        flex flex-row
        justify-around justify-self-end
        mt-5
        bg-slate-100
        w-full

        p-5
      "
    >
      <button
        id="id-2-3-1"
        class="
          block          
          bg-slate-300
          w-20
          h-10
          shadow-md
          rounded-2xl          
          hover:bg-slate-400          
          focus:bg-slate-400
          active:bg-slate-300
          active:shadow-none
        "
        @click.stop="cancelSelectType"
      >
        Cancel
      </button>
      <button
        id="id-2-3-2"
        class="
          block
          bg-slate-300
          w-20
          h-10
          shadow-md
          rounded-2xl          
          hover:bg-slate-400          
          focus:bg-slate-400          
          active:bg-slate-300
          active:shadow-none
        "
        @click.stop="acceptSelectType"
      >
        Select
      </button>
    </footer>
  </div>
</template>

<script setup>
  import { typeList } from '@/lib/typeList.js'
  const emit = defineEmits(['cancel', 'selected'])
  const props = defineProps({
    components: {
      type: Object
    }
  })

  onMounted(() => {
    console.log('Item Type Menu')
    props.components.forEach(component => {
      console.log(component.name)
    })
  })

  const html5Tab = ref({
    active: true
  })

  const projectTab = ref({
    active: false
  })

  const tabs = [html5Tab, projectTab]

  const selectedType = ref(null)

  function selectType(type) {
    selectedType.value = type
  }

  function clearSelection() {
    selectedType.value = null
  }

  function cancelSelectType() {
      emit('cancel')
      clearSelection()
  }

  function detactivateAll() {
    tabs.forEach(tab => tab.value.active = false)
  }

  function selectHtml5() {
    detactivateAll()
    html5Tab.value.active = true

  }

  function selectProject() {
    detactivateAll()
    projectTab.value.active = true

  }

  function acceptSelectType() {
    emit('selected', selectedType.value)
    clearSelection()
  }
</script>
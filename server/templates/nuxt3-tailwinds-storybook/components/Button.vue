<template>
  <button type="button" class="bg-slate-400 text-white rounded p-3 hover:bg-slate-700" @click="onClick">{{ label }}</button>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  name: 'my-button',

  props: {
    label: {
      type: String,
      required: true,
    },    
  },

  emits: ['click'],

  setup(props, { emit }) {
    props = reactive(props);
    return {     
      onClick() {
        emit('click');
      }
    }
  },
};
</script>

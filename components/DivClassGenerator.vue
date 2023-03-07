 <template>
  <div>
    <div v-for="val in props.values">
       &lt;div class="w-8 h-8 {{modifier}}{{props.tag}}-{{val}}"&gt;{{modifier}}{{props.tag}}-{{val}} &lt;/div&gt; 
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    tag:{
      type: String
    },
    values: {
      type: Array
    }
  })

  const modifiers = ['', 'hover:', 'active:', 'focus:']
</script>
 <template>
  <div>
    <div v-for="mode in modes">
      <div v-for="device in devices">
        <div v-for="modifier in modifiers">
          <div v-for="val in props.values">
            <div v-for="val2 in props.values2">
              &lt;div class="{{c(mode, device, modifier, val, val2)}}"&gt;{{mode}}{{device}}{{modifier}}-{{val}}-{{val2}} &lt;/div&gt; 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    tags:{
      type: Array
    },
    values: {
      type: Array
    }
    ,
    values2: {
      type: Array
    }
  })

  function c(mode, device, modifier, value, value2) {
    const cls = props.tags.reduce(( a, v ) => a + `${mode}${device}${modifier}${v}-${value}-${value2} `, '' )
    return cls
  }

  const modifiers = ['', 'hover:', 'active:', 'focus:']
  const modes = ['']   // ['', 'dark:']
  const devices = [''] // ['', 'sm:', 'md:', 'lg:', 'xl:']
</script>
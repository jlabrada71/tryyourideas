

<script setup >
  import { ref } from 'vue'
  
  const color = ref('red')

  const unsetBackImage = ref('url("http://localhost:3000/logo.png")')
  const hoverBackImage = ref('url(/images/text-gradient.png)')
  const activeBackImage = ref('url(/images/gradient-tutorial.png)')
  const focusBackImage = ref('url(/images/text-gradient.png)')

  const backImage = {
    unset: unsetBackImage,
    hover: hoverBackImage,
    active: activeBackImage,
    focus: focusBackImage
  }

  </script>
  <template>
    <div>
      <div class="image">hello</div>
    </div>
  </template>
  
  <style>
   .image {
      color: v-bind(color);
      background-image: v-bind(unsetBackImage );
    }

    .image:hover {
      background-image: v-bind(hoverBackImage );
    }

    .image:active {
      background-image: v-bind(activeBackImage );
    }

    .image:focus {
      background-image: v-bind(focusBackImage );
    }
  </style>

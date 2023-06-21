<template>
  <div class="flex flex-col">
    <div class="h-96 p-10 flex flex-col">
      <InputListWithTag 
        v-model:option="basisValue" 
        :options="basis" 
        tag="basis">Basis {{basisValue}}</InputListWithTag>
    
      <!-- <p>Basis: {{basisValue}}</p>

      <InputList :option="basisValue" :options="basis" @update:option="value=>basisValue = value">Basis</InputList> -->
      <p>Transforms: {{transformValue}}</p>
      <InputList v-model:option="transformValue" :options="transforms" >Transform</InputList>
    </div>
    <div class="h-96"></div>
    <div class="h-80"></div>
  </div>

  
</template>

<script setup>
  const basisValue = ref('unset')
  const basis = ['unset', "0", "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "5", "6", "7", "8", "9", "10", "11", "12", "14", "16", "20", "24", "28", "32", "36", "40", "44", "48", "52", "56", "60", "64", "72", "80", "96", 
                 "1/2", 
                 "1/3", "2/3", 
                 "1/4", "2/4", "3/4", 
                 "1/5", "2/5", "3/5", "4/5", 
                 "1/6", "2/6", "3/6", "4/6", "5/6", 
                 "1/12", "2/12", "3/12", "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", "10/12", "11/12", 
                 "px", "auto", "full"]
  const transformValue = ref('unset')
  
  const transforms = ['unset', '0', 'x-0', 'y-0', '50', 'x-50', 'y-50', '75', 'x-75', 'y-75', '90', 'x-90', 'y-90', '95', 'x-95', 'y-95', '100', 'x-100', 'y-100', '105', 'x-105', 'y-105', '110', 'x-110', 'y-110', '125', 'x-125', 'y-125', '150', 'x-150', 'y-150']
  

</script>
<template>
  <div class="flex flex-col w-full p-40">
    <h1 class="text-5xl ">Roadmap</h1>
    <ol class="flex flex-col ">
      <li v-for="task in roadMap" :key="task.goal" class="p-2 flex flex-row gap-4">
          <span class="w-1/4">task: <strong>{{task.goal}}</strong></span><span class="w-1/12"> date: <strong>{{task.date}}</strong></span><span>status: <strong>{{task.status}}</strong></span> 
      </li>
    </ol>     
  </div>

</template>
<script setup>
  const roadMap = ref([
  { goal: 'MVP',  date:'06/2023', status:'release v0.12'},
  { goal: 'Implement component composition',  date:'06/2023', status:'work in progress'},
  { goal: 'Implement design tokens',  date:'N/A', status:'planned'},
  { goal: 'Implement component variables',  date:'N/A', status:'planned'},
  { goal: 'Implement component properties',  date:'N/A', status:'planned'},
  { goal: 'Insert items from templates libraries',  date:'N/A', status:'planned'},
  { goal: 'Upload project assets(images)',  date:'N/A', status:'planned'},
  { goal: 'Implement duplicate component',  date:'N/A', status:'planned'},
  { goal: 'Implement copy and paste items',  date:'N/A', status:'planned'},
  { goal: 'Edit item id',  date:'N/A', status:'planned'},
  { goal: 'Implement introduction',  date:'N/A', status:'planned'},
  { goal: 'Implement undo and redo',  date:'N/A', status:'planned'}
  ])

</script>
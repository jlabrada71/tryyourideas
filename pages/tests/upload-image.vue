<template>
  <div>
    <input type="file" @change="uploadFile" ref="file">
    <button @click="submitFile">Upload!</button>
  </div>
  {{result}}
</template>

<script setup>
  import axios from 'axios'

  const images = ref(null)
  const file = ref(null)
  const result = ref('')

  function uploadFile() {
    images.value = file.value.files[0];
  }

  function submitFile() {
    const formData = new FormData();
    formData.append('file', images.value);
    const headers = { 'Content-Type': 'multipart/form-data' };
    axios.post('http://localhost:3000/api/v1/files', formData, { headers }).then((res) => {
      res.status; // HTTP status
      result.value = `${res.status} `
      console.log(Object.keys(res))
    });
  }

</script>
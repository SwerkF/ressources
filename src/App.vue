<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'

const user = ref('')

onMounted(async () => {
  let token = localStorage.getItem('token')
  if (token) {
    await axios.get('http://localhost:3000/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      user.value = res.data
      console.log(user.value)
    })
    .catch(err => {
      console.log(err)
    })
  }
})
</script>

<template>
  <div id="app">
    <Navbar/>
    <router-view :user="user"/>
  </div>
</template>

<style>
</style>

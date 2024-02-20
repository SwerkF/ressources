<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Landing from './components/Landing.vue'
import Items from './components/Items.vue'
</script>

<template>
  <div class="min-h-screen w-full grid place-items-center">
    <div class="container px-5">
      <Navbar />
      <Landing />
      <Items />
    </div> 
  </div>
</template>

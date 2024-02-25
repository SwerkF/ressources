<script lang="ts">
import { defineComponent } from 'vue'
import Landing from './components/Landing.vue'
import Items from './components/Items.vue'
</script>

<template>
  <div class="min-h-screen w-full grid place-items-center">
    <div class="container px-5">
      <Landing/>
      <Items />
    </div> 
  </div>
</template>
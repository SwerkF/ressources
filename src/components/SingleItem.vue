// Single Item Component
<script setup lang="ts">
import { defineProps } from 'vue'

import Image1 from '../assets/image.png'

const props = defineProps({
  title: String,
  description: String,
  image: String,
  link: String
})

</script>

<template>
  <div class="card bordered shadow-lg w-50">
    <div class="card-body">
      <img :src="Image1" alt="image" class="w-full h-32 object-cover rounded-lg">
      <h2 class="card-title text-lg font-bold mt-4">{{ props.title }}</h2>
        <p class="text-base mt-2">{{ props.description }}</p>
        <button class="btn btn-primary mt-4" onclick="my_modal_1.showModal()">Voir</button>
    </div>
  </div>

</template>




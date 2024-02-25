<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

import Image1 from '../assets/image.png'

const props = defineProps({
  title: String,
  description: String,
  image: String,
  link: String
})

// Define the events that this component can emit
const emit = defineEmits(['showModal'])

// Function to handle the button click
const handleButtonClick = () => {
  // Emit the 'showModal' event with the data you want to send
  emit('showModal', {
    title: props.title,
    description: props.description,
    image: Image1,
    link: props.link
  })
}
</script>

<template>
  <div class="card bordered shadow-lg w-50">
    <div class="card-body">
      <img :src="Image1" alt="image" class="w-full h-32 object-cover rounded-lg">
      <h2 class="card-title text-lg font-bold mt-4">{{ props.title }}</h2>
      <p class="text-base mt-2">{{ props.description }}</p>
      <button class="btn btn-primary mt-4" onclick="my_modal_1.showModal()" @click="handleButtonClick">Voir</button>
    </div>
  </div>
</template>

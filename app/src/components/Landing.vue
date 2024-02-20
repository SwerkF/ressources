<template>
  <header class="relative">
    <img src="https://source.unsplash.com/1600x900/?ui,ux" alt="" class="w-full h-full rounded-2xl xs:h-20 xs:w-20 absolute inset-0 object-cover">
  </header>
  <div class="hero py-8">
    <div class="hero-content text-center">
      <div class="max-w-xl">
        <span class="text-lg text-purple-500 font-medium block mb-3">Welcome stranger ✨</span>
        <h1 class="text-3xl md:text-5xl font-bold">Le grand site de ressources pour développeur</h1>
        <p class="py-6 px-5 md:px-16 text-xl">Toutes les ressources dont vous avez besoin.</p>
        <div class="flex items-center justify-center gap-6 mt-2 flex-wrap">
          <input type="text" placeholder="Design UI, Javascript..." class="input w-full max-w-xs bg-purple-100 placeholder-purple-500 font-medium" />
          <button class="btn btn-primary border-none bg-purple-500 hover:bg-indigo-700 normal-case px-6 text-base tracking-wider">Rechercher</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style>
header {
  min-height: clamp(12.5rem, 60vw, 21rem);
}
</style>


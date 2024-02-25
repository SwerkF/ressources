<script setup lang="ts">

// props user
import { defineProps } from 'vue'

const props = defineProps({
  user: Object
})

const themeController = (theme: string) => {  
    const body = document.querySelector('body')
    body?.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
}

// apply theme to the whole app on launch
const theme = localStorage.getItem('theme') || 'mytheme'
themeController(theme)

</script>

<template>
    <div class="navbar z-20">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="#" class="menu-title">Home</a></li>
            <li><a href="#" class="menu-title">About</a></li>
            <li><a href="#" class="menu-title">Contact</a></li>
            <li v-if="props.user">
              <a href="#" class="menu-title">Profile</a>
            </li>
            <li v-else>
              <a href="#" class="menu-title">Login</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost text-xl">Oliwer Skweres</a>
      </div>
      <div class="navbar-end">
        <button class="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">
            Theme
            <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
          </div>
          <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
            <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="My Theme" value="mytheme" @click="themeController('mytheme')" /></li>
            <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark" @click="themeController('dark')" /></li>
            <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="light" @click="themeController('light')" /></li>
            <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cupcake" value="light" @click="themeController('cupcake')" /></li>
          </ul>
        </div> 
      </div>
    </div>
</template>


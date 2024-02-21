<script setup lang="ts">
import SingleItem from './SingleItem.vue'
import SkeletonCard from './SkeletonCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
// axios request
const response = ref(null)
onMounted(async () => {
    axios.get('http://localhost:3000/api/ressources', {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res:any) => {
        console.log(res.data)
        setTimeout(() => { 
            response.value = res.data
        }, 2000)
    })
    .catch((err:any) => {
        console.log(err)
    })
})


</script>

<template>
    <div class="flex flex-col xl:flex-row gap-6 border-opacity-50">
        <div class="filters flex flex-row xl:flex-col xl:justify-start justify-center gap-6">
            <button class="btn btn-primary">All</button>
            <button class="btn btn-ghost">Design</button>
            <button class="btn btn-ghost">Development</button>
            <button class="btn btn-ghost">Business</button>
        </div>
        <div v-if="response === null" class="flex flex-wrap justify-center gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
        <div v-else class="flex flex-wrap justify-center gap-6">
            <SingleItem v-for="item in response" :key="item.id" :title="item.nom" :description="item.description" />
        </div>
        
    </div>
    <dialog id="my_modal_1" class="modal">
        <div class="modal-box w-50 max-w-7xl">
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">Click the button below to close</p>
            <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button, it will close the modal -->
                <button class="btn">Close</button>
            </form>
            </div>
        </div>
    </dialog>
</template>
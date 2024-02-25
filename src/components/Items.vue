<script setup lang="ts">
import SingleItem from './SingleItem.vue'
import SkeletonCard from './SkeletonCard.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

// axios request
const items = ref(null)
const categories = ref(null)
const selectedItem = ref({
    title: '',
    description: '',
    image: '',
    link: ''
})
onMounted(async () => {
    await axios.get('http://localhost:3000/api/ressources', {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res:any) => {
        items.value = res.data
    })
    .catch((err:any) => {
        console.log(err)
    })

    await axios.get('http://localhost:3000/api/categories', {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((res:any) => {
        categories.value = res.data
    })
    .catch((err:any) => {
        console.log(err)
    })
    
})

const handleShowModal = (data:any) => {
  selectedItem.value = data;
}

const filterCategory = (category:any) => {
    console.log(items.value)
    let filteredItems = items.value.filter((item:any) => {
        // items contaisn multiple categories
        return item.categories.includes(category.id)
    })

    items.value = filteredItems
}

</script>

<template>
    <div class="flex flex-col xl:flex-row gap-6 border-opacity-50">
        <div class="flex flex-row flex-wrap xl:flex-col xl:justify-start justify-center gap-2 xl:w-48">
            <button class="btn btn-primary">All</button>
            <button v-for="category in categories" :key="category.id" class="btn btn-ghost" @click="filterCategory(category)">{{ category.nom }}</button>
        </div>
        <div v-if="items === null" class="flex flex-wrap justify-center gap-6">
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
            <SingleItem v-for="item in items" :key="item.id" :title="item.nom" :description="item.description" @showModal="handleShowModal"/>
        </div>
    </div>

    <dialog id="my_modal_1" class="modal">
        <div class="modal-box w-50 max-w-7xl">
            <img :src="selectedItem.image" alt="image" class="w-full h-32 object-cover rounded-lg">
            <h3 class="font-bold text-xl mt-4">{{selectedItem.title}}</h3>
            <p class="py-4">{{ selectedItem.description }}</p>
            <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
            </div>
        </div>
    </dialog>
</template>
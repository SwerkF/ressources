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
    link: '',
    elements: []
})

let skip = ref(0)
onMounted(async () => {
    console.log('http://localhost:3000/api/ressources?skip=' + skip.value)
    await axios.get('http://localhost:3000/api/ressources?skip=' + skip.value, {
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
        console.log(res.data)
        categories.value = res.data
    })
    .catch((err:any) => {
        console.log(err)
    })
    
})

const handleShowModal = (data:any) => {
    console.log(data)
  selectedItem.value = data;
}

const filterCategory = (category:any) => {
    if(category == "All") {
        axios.get('http://localhost:3000/api/ressources?skip=' + skip.value, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((res:any) => {
            console.log(res.data)
            items.value = res.data
        })
        .catch((err:any) => {
            console.log(err)
        })
        return
    } else {
        console.log(category.idcategorie)
        axios.get('http://localhost:3000/api/ressources/category/' + category.idcategorie, {
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
    }
}

</script>

<template>
    <div class="flex flex-col xl:flex-row gap-6 border-opacity-50">
        <div class="flex flex-row flex-wrap xl:flex-col xl:justify-start justify-center gap-2 xl:w-48">
            <button class="btn btn-primary" @click="filterCategory('All')">All</button>
            <div v-for="category in categories" :key="category.idcategorie">
                <hr class="border border-gray-300 w-full">
                <button class="btn btn-ghost"  @click="filterCategory(category)">{{category.nom}}</button>
   
                <div v-if="category.subcategories.length > 0" class="flex flex-col gap-2">
                    <button class="btn btn-ghost btn-sm text-xs" v-for="subcategory in category.subcategories" :key="subcategory.idcategorie" @click="filterCategory(subcategory)">{{subcategory.nom}}</button>
                </div>  
            </div>
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
        <div v-else class="flex flex-wrap justify-center items-start gap-6">
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
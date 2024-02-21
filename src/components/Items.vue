<script setup lang="ts">
import SingleItem from './SingleItem.vue'
import SkeletonCard from './SkeletonCard.vue'
const items = [
    {
        title: 'Item 1',
        description: 'Description 1',
        image: 'https://source.unsplash.com/1600x900/?ui,ux',
        link: 'https://www.google.com'
    },
    {
        title: 'Item 2',
        description: 'Description 2',
        image: 'https://source.unsplash.com/1600x900/?ui,ux',
        link: 'https://www.google.com'
    },
    {
        title: 'Item 3',
        description: 'Description 3',
        image: 'https://source.unsplash.com/1600x900/?ui,ux',
        link: 'https://www.google.com'
    },
    {
        title: 'Item 4',
        description: 'Description 4',
        image: 'https://source.unsplash.com/1600x900/?ui,ux',
        link: 'https://www.google.com'
    },
    {
        title: 'Item 5',
        description: 'Description 5',
        image: 'https://source.unsplash.com/1600x900/?ui,ux',
        link: 'https://www.google.com'
    },
    {
        title: 'Item 6',
        description: 'Description 6',
        image: 'https://source.unsplash.com/1600x900/?ui,ux',
        link: 'https://www.google.com'
    }
]

let response:any = items;


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
            <SingleItem v-for="item in response" :key="item.title" :title="item.title" :description="item.description" :image="item.image" :link="item.link" />
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
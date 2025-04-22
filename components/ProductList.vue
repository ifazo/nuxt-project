<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
      <div
        class="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="group relative border-r border-b border-gray-200 p-4 sm:p-6"
        >
          <div
            class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75"
          >
            <img
              :src="product.imageSrc"
              :alt="product.imageAlt"
              class="h-full w-full object-cover object-center"
            >
          </div>
          <div class="pt-10 pb-4 text-center">
            <h3 class="text-sm font-medium text-gray-900">
              <NuxtLink :to="`/products/${product.href}`">
                <span aria-hidden="true" class="absolute inset-0" />
                {{
                  product.name.length > 20
                    ? product.name.slice(0, 20) + "..."
                    : product.name
                }}
              </NuxtLink>
            </h3>
            <div class="mt-3 flex flex-col items-center">
              <p class="sr-only">{{ product.rating }} out of 5 stars</p>
              <div class="flex items-center">
                <StarIcon
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[
                    product.rating > rating
                      ? 'text-yellow-400'
                      : 'text-gray-200',
                    'h-5 w-5 flex-shrink-0',
                  ]"
                  aria-hidden="true"
                />
              </div>
              <p class="mt-1 text-sm text-gray-500">
                {{ product.reviewCount }} reviews
              </p>
            </div>
            <p class="mt-4 text-base font-medium text-gray-900">
              {{ product.price }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from "@heroicons/vue/20/solid";

const products = [
  {
    id: 1,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc: "https://i.ibb.co.com/DLNnXjT/r5-500x500.jpg",
    imageAlt: "TODO",
    href: "1",
  },
  {
    id: 2,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc: "https://i.ibb.co.com/DLNnXjT/r5-500x500.jpg",
    imageAlt: "TODO",
    href: "2",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc: "https://i.ibb.co.com/DLNnXjT/r5-500x500.jpg",
    imageAlt: "TODO",
    href: "3",
  },
  {
    id: 4,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc: "https://i.ibb.co.com/DLNnXjT/r5-500x500.jpg",
    imageAlt: "TODO",
    href: "4",
  },
  // More products...
];
</script>

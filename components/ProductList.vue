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
              :src="product.images[0]"
              :alt="product.title"
              class="h-full w-full object-cover object-center"
            >
          </div>
          <div class="pt-10 pb-4 text-center">
            <h3 class="text-sm font-medium text-gray-900">
              <NuxtLink :to="`/products/${product.id}`">
                <span aria-hidden="true" class="absolute inset-0" />
                {{
                  product.title.length > 20
                    ? product.title.slice(0, 20) + "..."
                    : product.title
                }}
              </NuxtLink>
            </h3>
            <div class="mt-3 flex flex-col items-center">
              <p class="sr-only">{{ rating }} out of 5 stars</p>
              <div class="flex items-center">
                <StarIcon
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[
                    rating > rating ? 'text-yellow-400' : 'text-gray-200',
                    'h-5 w-5 flex-shrink-0',
                  ]"
                  aria-hidden="true"
                />
              </div>
              <p class="mt-1 text-sm text-gray-500">
                {{ product.stock }} reviews
              </p>
            </div>
            <p class="mt-4 text-base font-medium text-gray-900">
              ${{ product.price }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from "@heroicons/vue/20/solid";
import type { Product } from "@prisma/client";

const products = ref<Product[]>([]);
console.log(products);
const rating = ref<number>(3);

onMounted(async () => {
  try {
    const data = await $fetch<Product[]>("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data) {
      products.value = data;
    } else {
      console.error("No products found");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>

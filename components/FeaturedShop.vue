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
  <div>
    <div
      v-if="shops.length > 0"
      class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8"
    >
      <div class="flex items-center justify-between space-x-4">
        <h2 class="text-lg font-medium text-gray-900">Featured Shop</h2>
        <NuxtLink
          to="/shops"
          class="text-sm font-medium whitespace-nowrap text-indigo-600 hover:text-indigo-500"
        >
          View all
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
      </div>
      <div
        class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div v-for="shop in shops" :key="shop.id" class="group relative">
          <div
            class="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100"
          >
            <img
              :src="shop.logo"
              alt=""
              class="h-48 w-full object-cover object-center group-hover:opacity-75"
            >
            <!-- <div
              class="flex items-end p-4 opacity-0 group-hover:opacity-100"
              aria-hidden="true"
            >
              <div
                class="bg-opacity-75 w-full rounded-md bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 backdrop-blur backdrop-filter"
              >
                Visit Shop
              </div>
            </div> -->
          </div>
          <div
            class="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900"
          >
            <h3>
              <NuxtLink :to="`/shops/${shop.id}`">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ shop.name }}
              </NuxtLink>
            </h3>
            <p
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              visit shop
              <span aria-hidden="true"> &rarr;</span>
            </p>
          </div>
          <p class="mt-1 text-sm font-medium text-gray-500">
            {{ shop.productCount }} Products
          </p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8"
    >
      <p class="text-sm text-gray-500">Shops are loading, please wait...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Shop } from "@prisma/client";

type EShop = Shop & {
  productCount: number;
};

const shops = ref<EShop[]>([]);

onMounted(async () => {
  try {
    const data = await $fetch<EShop[]>("/api/shops?random=4");
    if (data && data.length > 0) {
      shops.value = data;
    } else {
      console.error("No shops found");
    }
  } catch (error) {
    console.error("Error fetching shops:", error);
  }
});
</script>

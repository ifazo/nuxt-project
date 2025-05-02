<template>
  <div>
    <div
      v-if="shops.length"
      class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8"
    >
      <div class="flex items-center justify-between space-x-4">
        <h2 class="text-lg font-medium text-gray-900">Shop List</h2>
        <div
          class="text-sm font-medium whitespace-nowrap text-indigo-600 hover:text-indigo-500"
        >
          {{ shops.length }} Shops
        </div>
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
            {{ shop._count.products }} Products
          </p>
        </div>
      </div>
    </div>
    <!-- Skeleton Loader -->
    <div
      v-else
      class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8"
    >
      <!-- Skeleton Header -->
      <div class="flex items-center justify-between space-x-4">
        <div class="h-7 w-32 animate-pulse rounded bg-gray-200" />
        <div class="h-5 w-20 animate-pulse rounded bg-gray-200" />
      </div>

      <!-- Skeleton Grid -->
      <div
        class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <!-- Repeat skeleton items -->
        <div v-for="i in 12" :key="i" class="group relative">
          <!-- Skeleton Image -->
          <div
            class="aspect-h-3 aspect-w-4 animate-pulse overflow-hidden rounded-lg bg-gray-200"
          >
            <div class="h-48 w-full" />
          </div>

          <!-- Skeleton Title and Link -->
          <div class="mt-4 flex items-center justify-between space-x-8">
            <div class="h-5 w-24 animate-pulse rounded bg-gray-200" />
            <div class="h-5 w-20 animate-pulse rounded bg-gray-200" />
          </div>

          <!-- Skeleton Product Count -->
          <div class="mt-1 h-4 w-28 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Shop } from "@prisma/client";

type EShop = Shop & {
  _count: {
    products: number;
  };
};

const shops = ref<EShop[]>([]);

onMounted(async () => {
  try {
    const data = await $fetch<EShop[]>("/api/shops");
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

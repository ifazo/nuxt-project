<template>
  <div>
    <div v-if="products.length" class="bg-white">
      <div
        class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900">
          Products
        </h2>
        <p class="my-4 text-center text-lg font-semibold text-gray-500">
          Discover our range of products.
        </p>

        <div
          class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          <NuxtLink
            v-for="product in products"
            :key="product.id"
            :to="`/products/${product.id}`"
            class="group"
          >
            <img
              :src="product.images[0]"
              :alt="product.title"
              class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
            >
            <div class="relative mt-2 flex items-center justify-between px-2">
              <h3 class="text-sm font-medium text-gray-900">
                {{ product.title }}
              </h3>
              <p class="text-sm font-medium text-gray-900">
                ${{ product.price }}
              </p>
            </div>
            <div class="relative mt-1 flex items-center justify-between px-2">
              <p class="text-sm font-medium text-gray-500">
                {{ product.shopName }}
              </p>
              <p class="text-sm font-medium text-gray-500">
                {{ product.categoryName }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class="flex h-screen items-center justify-center bg-white">
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@prisma/client";

const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    const data = await $fetch<Product[]>("/api/products");
    if (data && data.length > 0) {
      products.value = data;
    } else {
      console.error("No products found");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>

<style scoped></style>

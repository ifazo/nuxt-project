<template>
  <div>
    <div v-if="products.length">
      <h2 class="text-lg font-medium text-gray-900">Featured Product</h2>
      <ul role="list" class="mt-6 space-y-4">
        <li
          v-for="product in products"
          :key="product.id"
          class="flex items-center space-x-3"
        >
          <img
            :src="product.images[0]"
            alt=""
            class="h-12 w-12 flex-shrink-0 rounded-sm bg-gray-200"
          >
          <NuxtLink :to="`/products/${product.id}`" class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900">
              {{
                product.title.length > 15
                  ? product.title.slice(0, 15) + "..."
                  : product.title
              }}
            </p>
            <p class="text-sm text-gray-500">{{ product.shopName }}</p>
            <p class="text-xs text-gray-400">${{ product.price }}</p>
          </NuxtLink>
        </li>
      </ul>
      <div class="mt-6">
        <NuxtLink
          to="/products"
          class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View all products
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
      </div>
    </div>
    <!-- Products Skeleton -->
    <div v-else>
      <div class="h-7 w-36 animate-pulse rounded bg-gray-200" />
      <ul role="list" class="mt-6 space-y-4">
        <li v-for="i in 5" :key="i" class="flex items-center space-x-3">
          <!-- Product Image Skeleton -->
          <div
            class="h-12 w-12 flex-shrink-0 animate-pulse rounded-sm bg-gray-200"
          />
          <div class="min-w-0 flex-1">
            <!-- Product Title Skeleton -->
            <div class="h-5 w-32 animate-pulse rounded bg-gray-200" />
            <!-- Shop Name Skeleton -->
            <div class="mt-1 h-4 w-28 animate-pulse rounded bg-gray-200" />
            <!-- Price Skeleton -->
            <div class="mt-1 h-3 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </li>
      </ul>
      <div class="mt-6">
        <!-- View All Link Skeleton -->
        <div class="h-5 w-32 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "@prisma/client";

const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    const productsData = await $fetch<Product[]>("/api/products?random=5");
    if (productsData && productsData.length > 0) {
      products.value = productsData;
    } else {
      console.error("No products found");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>

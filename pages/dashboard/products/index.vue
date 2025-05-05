<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">
          Products
        </h2>
        <NuxtLink
          to="/dashboard/products/add"
          class="text-sm font-medium whitespace-nowrap text-indigo-600 hover:text-indigo-500"
        >
          Add Product
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
      </div>
      <div
        class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
        >
          <div
            class="aspect-h-4 aspect-w-3 sm:aspect-none bg-gray-200 group-hover:opacity-75 sm:h-96"
          >
            <img
              :src="product.images[0]"
              :alt="product.title"
              class="h-full w-full object-cover object-center sm:h-full sm:w-full"
            >
          </div>
          <div class="flex flex-1 flex-col space-y-2 p-4">
            <h3 class="text-sm font-medium text-gray-900">
              <NuxtLink :to="`/products/${product.id}`">
                <span aria-hidden="true" class="absolute inset-0" />
                {{ product.title }}
              </NuxtLink>
            </h3>
            <p class="text-sm text-gray-500">
              {{
                product.description.length > 80
                  ? product.description.substring(0, 80) + "..."
                  : product.description
              }}
            </p>
            <div class="flex flex-1 justify-between">
              <p class="text-base font-medium text-gray-900">
                ${{ product.price }}
              </p>
              <p class="text-sm text-gray-500 italic">
                {{ product.categoryName }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Shop, Product } from "@prisma/client";

const userStore = useUserStore();
const user = computed(() => userStore.user);
const shop = ref<Shop | null>(null);
const products = ref<Product[] | []>([]);

onMounted(async () => {
  userStore.initializeUser();
  try {
    if (user.value) {
      const data = await $fetch<Shop>(
        `/api/shops?userEmail=${user.value.email}`,
      );
      if (data) {
        shop.value = data;
        const productsData = await $fetch<Product[]>(
          `/api/products?shopName=${shop.value.name}`,
        );
        products.value = productsData;
      }
    }
  } catch (error) {
    console.error("Error fetching shops:", error);
  }
});

definePageMeta({
  middleware: ["auth"],
  layout: "dashboard",
});
</script>

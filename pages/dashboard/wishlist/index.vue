<template>
  <div>
    <div v-if="products?.length" class="bg-white">
      <div class="mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-7xl">
        <h2 class="text-xl font-bold text-gray-900">Wishlist Products</h2>

        <div
          class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
        >
          <div v-for="product in products" :key="product.id">
            <div class="relative">
              <div class="relative h-72 w-full overflow-hidden rounded-lg">
                <img
                  :src="product.images[0]"
                  :alt="product.title"
                  class="h-full w-full object-cover object-center"
                >
              </div>
              <div class="relative mt-4">
                <h3 class="text-sm font-medium text-gray-900">
                  {{ product.title }}
                </h3>
              </div>
              <div
                class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4"
              >
                <div
                  aria-hidden="true"
                  class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                />
                <p class="relative text-lg font-semibold text-white">
                  ${{ product.price }}
                </p>
              </div>
            </div>
            <div class="mt-6">
              <NuxtLink
                :to="`/products/${product.id}`"
                class="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                >Visit product<span class="sr-only">, {{ product.title }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="py-8 text-start text-gray-500 sm:py-12">
        No products in your wishlist.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product, Wishlist } from "@prisma/client";

type WishlistProducts = Wishlist & {
  product: Product;
};

const userStore = useUserStore();
const user = computed(() => userStore.user);
const products = ref<Product[] | null>([]);

onMounted(async () => {
  if (!user.value) {
    return;
  }
  const data = await $fetch<WishlistProducts[]>("/api/wishlist", {
    method: "GET",
    headers: {
      "user-email": user.value?.email,
    },
  });
  products.value = data.map((wishlistItem) => wishlistItem.product);
});

definePageMeta({
  layout: "dashboard",
});
</script>

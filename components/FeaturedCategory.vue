<template>
  <div>
    <div
      v-if="categories.length"
      class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8"
    >
      <div class="flex items-center justify-between space-x-4">
        <h2 class="text-lg font-medium text-gray-900">Featured Category</h2>
        <NuxtLink
          to="/categories"
          class="text-sm font-medium whitespace-nowrap text-indigo-600 hover:text-indigo-500"
        >
          View all
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
      </div>
      <div
        class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="`/categories/${category.id}`"
          class="group flex flex-col rounded-xl border border-gray-200 bg-white shadow-2xs transition hover:shadow-md focus:shadow-md focus:outline-hidden dark:border-neutral-800 dark:bg-neutral-900"
          href="#"
        >
          <div class="p-4 md:p-5">
            <div class="flex gap-x-5">
              <!-- Dynamic Icon -->
              <Icon
                :icon="`lucide:${category.icon}`"
                class="mt-1 size-5 shrink-0 text-gray-800 dark:text-neutral-200"
              />
              <div class="grow">
                <h3
                  class="font-semibold text-gray-800 group-hover:text-blue-600 dark:text-neutral-200 dark:group-hover:text-neutral-400"
                >
                  {{ category.name }}
                </h3>
                <p
                  class="text-sm font-medium text-gray-500 dark:text-neutral-500"
                >
                  {{ category._count.products }} Products
                </p>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <!-- Skeleton Loader -->
    <div
      v-else
      class="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8"
    >
      <!-- Skeleton Header -->
      <div class="flex items-center justify-between space-x-4">
        <div class="h-7 w-40 animate-pulse rounded bg-gray-200" />
        <div class="h-5 w-20 animate-pulse rounded bg-gray-200" />
      </div>

      <!-- Skeleton Grid -->
      <div
        class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <!-- Repeat skeleton items -->
        <div
          v-for="i in 8"
          :key="i"
          class="flex flex-col rounded-xl border border-gray-200 bg-white shadow-2xs dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div class="p-4 md:p-5">
            <div class="flex gap-x-5">
              <!-- Skeleton Icon -->
              <div
                class="mt-1 size-5 shrink-0 animate-pulse rounded bg-gray-200"
              />
              <div class="grow">
                <!-- Skeleton Category Name -->
                <div class="h-5 w-24 animate-pulse rounded bg-gray-200" />
                <!-- Skeleton Product Count -->
                <div class="mt-1 h-4 w-28 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { Category } from "@prisma/client";

type ECategory = Category & {
  _count: {
    products: number;
  };
};

const categories = ref<ECategory[]>([]);

onMounted(async () => {
  try {
    const data = await $fetch<ECategory[]>("/api/categories?random=8");
    if (data && data.length > 0) {
      categories.value = data;
    } else {
      console.error("No categories found");
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});
</script>

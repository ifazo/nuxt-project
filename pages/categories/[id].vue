<template>
  <div>
    <div v-if="category">
      <div class="divide-y divide-gray-200">
        <div class="pb-6">
          <div
            class="mt-6 flow-root px-4 sm:mt-4 sm:flex sm:items-end sm:px-6 lg:mt-8 lg:px-8"
          >
            <div>
              <div class="-m-1 flex">
                <div
                  class="inline-flex overflow-hidden rounded-lg border-4 border-white"
                >
                  <Icon
                    :icon="`lucide:${category.icon}`"
                    class="h-12 w-12 text-gray-600 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            <div class="mt-6 sm:ml-6 sm:flex-1">
              <div>
                <div class="flex items-center">
                  <h3 class="text-xl font-bold text-gray-900 sm:text-2xl">
                    {{ category.name }}
                  </h3>
                </div>
                <p class="text-sm text-gray-500">
                  {{ category.products.length }} products
                </p>
              </div>
              <div
                class="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3"
              >
                <button
                  type="button"
                  class="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:flex-1"
                >
                  Follow
                </button>
                <button
                  type="button"
                  class="inline-flex w-full flex-1 items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                >
                  Message
                </button>
                <div class="ml-3 inline-flex sm:ml-0">
                  <Menu as="div" class="relative inline-block text-left">
                    <MenuButton
                      class="relative inline-flex items-center rounded-md bg-white p-2 text-gray-400 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    >
                      <span class="absolute -inset-1" />
                      <span class="sr-only">Open options menu</span>
                      <EllipsisVerticalIcon
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                    </MenuButton>
                    <transition
                      enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95"
                    >
                      <MenuItems
                        class="ring-opacity-5 absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none"
                      >
                        <div class="py-1">
                          <MenuItem v-slot="{ active }">
                            <a
                              href="#"
                              :class="[
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm',
                              ]"
                              >Share category</a
                            >
                          </MenuItem>
                          <MenuItem v-slot="{ active }">
                            <a
                              href="#"
                              :class="[
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm',
                              ]"
                              >Copy category link</a
                            >
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-6 px-4 sm:px-6 lg:mt-12 lg:px-8">
          <div
            class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8"
          >
            <NuxtLink
              v-for="product in category?.products"
              :key="product.id"
              :to="`/products/${product.id}`"
              class="group"
            >
              <img
                :src="product.images[0]"
                :alt="product.title"
                class="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
              >
              <h3 class="mt-4 text-sm text-gray-700">{{ product.title }}</h3>
              <p class="mt-1 text-lg font-medium text-gray-900">
                ${{ product.price }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex h-screen items-center justify-center bg-white">
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";
import type { Product, Category } from "@prisma/client";
import { useRoute } from "vue-router";

type CategoryProduct = Category & {
  products: Product[];
};

const route = useRoute();

const category = ref<CategoryProduct | null>(null);

onMounted(async () => {
  const categoryId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  try {
    const categoryData = await $fetch<CategoryProduct>(
      `/api/categories/${categoryId}`,
    );
    category.value = categoryData;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
});
</script>

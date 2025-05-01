<template>
  <div v-if="shop">
    <div class="divide-y divide-gray-200">
      <div class="pb-6">
        <div class="h-24 bg-indigo-700 sm:h-20 lg:h-28" />
        <div
          class="-mt-12 flow-root px-4 sm:-mt-8 sm:flex sm:items-end sm:px-6 lg:-mt-16"
        >
          <div>
            <div class="-m-1 flex">
              <div
                class="inline-flex overflow-hidden rounded-lg border-4 border-white"
              >
                <img
                  class="h-24 w-24 flex-shrink-0 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
                  :src="shop.logo"
                  alt=""
                >
              </div>
            </div>
          </div>
          <div class="mt-6 sm:ml-6 sm:flex-1">
            <div>
              <div class="flex items-center">
                <h3 class="text-xl font-bold text-gray-900 sm:text-2xl">
                  {{ shop.name }}
                </h3>
                <span
                  class="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400"
                >
                  <span class="sr-only">Online</span>
                </span>
              </div>
              <p class="text-sm text-gray-500">@shop-{{ shop.id }}</p>
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
                    <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
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
                            >Edit shop</a
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
                            >Delete shop</a
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
      <div class="px-4 py-5 sm:px-0 sm:py-0">
        <dl class="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
          <div class="sm:flex sm:px-6 sm:py-5">
            <dt
              class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48"
            >
              Details
            </dt>
            <dd
              class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6"
            >
              <p>
                {{ shop.details }}
              </p>
            </dd>
          </div>
          <div class="sm:flex sm:px-6 sm:py-5">
            <dt
              class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48"
            >
              Owner
            </dt>
            <dd
              class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6"
            >
              {{ shop.userEmail }}
            </dd>
          </div>
          <div class="sm:flex sm:px-6 sm:py-5">
            <dt
              class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48"
            >
              Website
            </dt>
            <dd
              class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6"
            >
              {{ shop.name.toLowerCase().replace(/\s+/g, "") }}.com
            </dd>
          </div>
          <div class="sm:flex sm:px-6 sm:py-5">
            <dt
              class="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 lg:w-48"
            >
              Created
            </dt>
            <dd
              v-if="shop.createdAt"
              class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 sm:ml-6"
            >
              <time datetime="2020-01-07">
                {{ new Date(shop.createdAt).toLocaleDateString() }}
              </time>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="text-center">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vector-effect="non-scaling-stroke"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 class="mt-2 text-sm font-semibold text-gray-900">No Shop Found</h3>
      <p class="mt-1 text-sm text-gray-500">
        Get started by creating your shop.
      </p>
      <div class="mt-6">
        <button
          type="button"
          class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="open = true"
        >
          <PlusIcon class="mr-1.5 -ml-0.5 h-5 w-5" aria-hidden="true" />
          Create Shop
        </button>
      </div>
    </div>
    <ShopFormModal v-model:open="open" />
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { PlusIcon, EllipsisVerticalIcon } from "@heroicons/vue/20/solid";
import type { Shop } from "@prisma/client";
import ShopFormModal from "~/components/ShopFormModal.vue";

const open = ref(false);

const userStore = useUserStore();
const user = computed(() => userStore.user);
const shop = ref<Shop | null>(null);

onMounted(async () => {
  userStore.initializeUser();
  try {
    if (user.value) {
      const data = await $fetch<Shop>(
        `/api/shops?userEmail=${user.value.email}`,
      );
      shop.value = data;
    }
  } catch (error) {
    console.error("Error fetching shops:", error);
  }
});

definePageMeta({
  layout: "dashboard",
});
</script>

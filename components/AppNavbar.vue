<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <Disclosure v-slot="{ open }" as="header" class="bg-white shadow">
    <div
      class="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8"
    >
      <div class="relative flex h-16 justify-between">
        <div class="relative z-10 flex px-2 lg:px-0">
          <div class="flex flex-shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            >
          </div>
        </div>
        <div
          class="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0"
        >
          <div class="w-full sm:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <MagnifyingGlassIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              >
            </div>
          </div>
        </div>
        <div class="relative z-10 flex items-center lg:hidden">
          <!-- Mobile menu button -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
          <button
            type="button"
            class="relative flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-4 flex-shrink-0">
            <div v-if="user">
              <MenuButton
                class="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <UserCircleIcon class="h-8 w-8 rounded-full" />
                <!-- <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" /> -->
              </MenuButton>
            </div>
            <div v-else>
              <UButton label="Sign in" color="neutral" variant="outline">
                <NuxtLink to="/sign-in">Sign in</NuxtLink>
              </UButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <NuxtLink
                    :to="item.href"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >{{ item.name }}</NuxtLink
                  >
                </MenuItem>
                <MenuItem v-if="user">
                  <button
                    type="button"
                    :class="[
                      'w-full text-start block px-4 py-2 text-sm text-gray-700',
                      'hover:bg-gray-100 hover:text-gray-900',
                    ]"
                    @click="handleSignOut"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
      <nav class="hidden lg:flex lg:space-x-8 lg:py-2" aria-label="Global">
        <NuxtLink
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</NuxtLink
        >
      </nav>
    </div>
    <DisclosurePanel as="nav" class="lg:hidden" aria-label="Global">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
      <div class="border-t border-gray-200 pb-3 pt-4">
        <div class="flex items-center px-4">
          <div v-if="user">
            <div class="flex-shrink-0">
              <UserCircleIcon class="h-10 w-10 rounded-full" />
              <!-- <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" /> -->
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800">
                {{ user.name }}
              </div>
              <div class="text-sm font-medium text-gray-500">
                {{ user.email }}
              </div>
            </div>
          </div>
          <div v-else>
            <UButton label="Sign in" color="neutral" variant="outline">
              <NuxtLink to="/sign-in">Sign in</NuxtLink>
            </UButton>
          </div>
          <button
            type="button"
            class="relative ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute -inset-1.5" />
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-3 space-y-1 px-2">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          >
            <NuxtLink :to="item.href">{{ item.name }}</NuxtLink>
          </DisclosureButton>
          <DisclosureButton
            v-if="user"
            class="w-full text-start block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            @click="handleSignOut"
            >Sign out</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";
import type { User } from "firebase/auth";
import { signOut } from "~/lib/firebase";
import { useRouter } from "vue-router";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Product", href: "/products", current: false },
  { name: "Category", href: "/categories", current: false },
  { name: "Blog", href: "/blogs", current: false },
];
const userNavigation = [
  { name: "Profile", href: "/profile" },
  { name: "Dashboard", href: "/dashboard" },
];

const toast = useToast();
const router = useRouter();

const user = computed(() => userStore.user) as Ref<{
  name: string;
  email: string;
  imageUrl: string;
} | null>;
// const products = computed(() => cartStore.cart);
const userStore = useUserStore();
// const cartStore = useCartStore();

onMounted(() => {
  userStore.initializeUser();
  const fetchedUser = userStore.user as unknown as User;

  if (fetchedUser) {
    user.value = {
      name: fetchedUser.displayName || "Anonymous",
      email: fetchedUser.email || "No email",
      imageUrl:
        fetchedUser.photoURL ||
        "https://pic.onlinewebfonts.com/thumbnails/icons_107378.svg",
    };
  } else {
    user.value = null;
  }
  // cartStore.initializeCart();
});

const handleSignOut = () => {
  signOut()
    .then(() => {
      user.value = null;
      userStore.removeUser();
      toast.add({
        title: "Success",
        description: "User signed out successfully",
        color: "success",
      });
      router.push("/sign-in");
    })
    .catch((err) => {
      toast.add({
        title: "Error",
        description: err.message,
        color: "error",
      });
    });
};
</script>

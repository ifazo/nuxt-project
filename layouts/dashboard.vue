<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div v-if="user">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="fixed inset-0 z-40 flex md:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="bg-opacity-75 fixed inset-0 bg-gray-600" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div class="relative flex w-full max-w-xs flex-1 flex-col bg-white">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
              <div class="flex flex-shrink-0 items-center px-4">
                <NuxtLink to="/" class="flex items-center">
                  <img
                    class="h-8 w-auto"
                    src="assets/images/logo.png"
                    alt="logo"
                  >
                  <span class="ml-3 text-xl font-semibold text-gray-900">
                    Nuxty
                  </span>
                </NuxtLink>
              </div>
              <nav class="mt-5 space-y-1 px-2">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center rounded-md px-2 py-2 text-base font-medium',
                  ]"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.current
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-4 h-6 w-6 flex-shrink-0',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </NuxtLink>
              </nav>
            </div>
            <div class="flex flex-shrink-0 border-t border-gray-200 p-4">
              <NuxtLink to="/dashboard" class="group block flex-shrink-0">
                <div class="flex items-center">
                  <div v-if="user.image">
                    <img
                      class="inline-block h-10 w-10 rounded-full"
                      :src="user.image"
                      alt=""
                    >
                  </div>
                  <div v-else>
                    <UserCircleIcon
                      class="h-10 w-10 flex-shrink-0 text-gray-400"
                    />
                  </div>
                  <div class="ml-3">
                    <p
                      class="text-base font-medium text-gray-700 group-hover:text-gray-900"
                    >
                      {{ user.name }}
                    </p>
                    <p
                      class="text-sm font-medium text-gray-500 group-hover:text-gray-700"
                    >
                      {{ user.email }}
                    </p>
                  </div>
                </div>
              </NuxtLink>
              <button
                type="button"
                class="ml-auto flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset"
                @click="handleSignOut"
              >
                <ArrowRightStartOnRectangleIcon
                  class="h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </TransitionChild>
        <div class="w-14 flex-shrink-0">
          <!-- Force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white"
      >
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <NuxtLink to="/" class="flex items-center">
              <img class="h-8 w-auto" src="assets/images/logo.png" alt="logo" >
              <span class="ml-3 text-xl font-semibold text-gray-900">
                Nuxty
              </span>
            </NuxtLink>
          </div>
          <nav class="mt-5 flex-1 space-y-1 bg-white px-2">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 h-6 w-6 flex-shrink-0',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </NuxtLink>
          </nav>
        </div>
        <div class="flex flex-shrink-0 border-t border-gray-200 p-4">
          <NuxtLink to="/dashboard" class="group block w-full flex-shrink-0">
            <div class="flex items-center">
              <div v-if="user.image">
                <img
                  class="inline-block h-9 w-9 rounded-full"
                  :src="user.image"
                  alt=""
                >
              </div>
              <div v-else>
                <UserCircleIcon class="h-9 w-9 flex-shrink-0 text-gray-400" />
              </div>
              <div class="ml-3">
                <p
                  class="text-sm font-medium text-gray-700 group-hover:text-gray-900"
                >
                  {{ user.name }}
                </p>
                <p
                  class="text-xs font-medium text-gray-500 group-hover:text-gray-700"
                >
                  {{ user.email }}
                </p>
              </div>
            </div>
          </NuxtLink>
          <button
            type="button"
            class="ml-auto flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset"
            @click="handleSignOut"
          >
            <ArrowRightStartOnRectangleIcon
              class="h-6 w-6"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-1 flex-col md:pl-64">
      <div
        class="sticky top-0 z-10 bg-gray-100 pt-1 pl-1 sm:pt-3 sm:pl-3 md:hidden"
      >
        <button
          type="button"
          class="-mt-0.5 -ml-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars2Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <main class="flex-1">
        <div class="py-6">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 class="text-2xl font-semibold text-gray-900">
              {{ user.role.charAt(0) + user.role.slice(1).toLowerCase() }}
              Dashboard
            </h1>
          </div>
          <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <slot />
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogOverlay,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  HomeIcon,
  PencilSquareIcon,
  Bars2Icon,
  Square2StackIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserCircleIcon,
  GiftIcon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import { signOut } from "~/lib/firebase";
import { useRoute } from "vue-router";

const sidebarOpen = ref(false);

const route = useRoute();
const toast = useToast();

const userStore = useUserStore();
const user = computed(() => userStore.user);

onMounted(() => {
  userStore.initializeUser();
});

const buyerNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Cart",
    href: "/dashboard/cart",
    icon: ShoppingCartIcon,
    current: false,
  },
  {
    name: "Wishlist",
    href: "/dashboard/wishlist",
    icon: HeartIcon,
    current: false,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingBagIcon,
    current: false,
  },
];

const sellerNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: GiftIcon,
    current: false,
  },
  {
    name: "Shops",
    href: "/dashboard/shops",
    icon: BuildingStorefrontIcon,
    current: false,
  },
];

const adminNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Blogs",
    href: "/dashboard/blogs",
    icon: PencilSquareIcon,
    current: false,
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: Square2StackIcon,
    current: false,
  },
];

const navigation = computed(() => {
  const currentPath = route.path;

  if (user.value?.role === "BUYER") {
    return buyerNavigation.map((item) => ({
      ...item,
      current: item.href === currentPath,
    }));
  } else if (user.value?.role === "SELLER") {
    return sellerNavigation.map((item) => ({
      ...item,
      current: item.href === currentPath,
    }));
  } else if (user.value?.role === "ADMIN") {
    return adminNavigation.map((item) => ({
      ...item,
      current: item.href === currentPath,
    }));
  }
  return [];
});

const handleSignOut = () => {
  signOut()
    .then(() => {
      userStore.removeUser();
      toast.add({
        title: "Success",
        description: "User signed out successfully",
        color: "success",
      });
      navigateTo("/sign-in");
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

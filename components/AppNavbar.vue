<template>
  <div class="bg-white">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="mobileMenuOpen">
      <Dialog class="relative z-40 lg:hidden" @close="mobileMenuOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="bg-opacity-25 fixed inset-0 bg-black" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
            >
              <div class="flex px-4 pt-5 pb-2">
                <button
                  type="button"
                  class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  @click="mobileMenuOpen = false"
                >
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab
                      v-for="category in navigation.categories"
                      :key="category.name"
                      v-slot="{ selected }"
                      as="template"
                    >
                      <button
                        :class="[
                          selected
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-900',
                          'flex-1 border-b-2 px-1 py-4 text-base font-medium whitespace-nowrap',
                        ]"
                      >
                        {{ category.name }}
                      </button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel
                    v-for="(category, categoryIdx) in navigation.categories"
                    :key="category.name"
                    class="space-y-12 px-4 pt-10 pb-6"
                  >
                    <div class="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                      <div class="grid grid-cols-1 gap-x-6 gap-y-10">
                        <div>
                          <p
                            :id="`mobile-featured-heading-${categoryIdx}`"
                            class="font-medium text-gray-900"
                          >
                            Featured
                          </p>
                          <ul
                            role="list"
                            :aria-labelledby="`mobile-featured-heading-${categoryIdx}`"
                            class="mt-6 space-y-6"
                          >
                            <li
                              v-for="item in category.featured"
                              :key="item.name"
                              class="flex"
                            >
                              <NuxtLink
                                :to="item.href"
                                class="font-medium text-gray-500"
                                >{{ item.name }}</NuxtLink
                              >
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p
                            id="mobile-categories-heading"
                            class="font-medium text-gray-900"
                          >
                            Categories
                          </p>
                          <ul
                            role="list"
                            aria-labelledby="mobile-categories-heading"
                            class="mt-6 space-y-6"
                          >
                            <li
                              v-for="item in category.categories"
                              :key="item.name"
                              class="flex"
                            >
                              <NuxtLink
                                :to="item.href"
                                class="font-medium text-gray-500"
                                >{{ item.name }}</NuxtLink
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="grid grid-cols-1 gap-x-6 gap-y-10">
                        <div>
                          <p
                            id="mobile-collection-heading"
                            class="font-medium text-gray-900"
                          >
                            Collection
                          </p>
                          <ul
                            role="list"
                            aria-labelledby="mobile-collection-heading"
                            class="mt-6 space-y-6"
                          >
                            <li
                              v-for="item in category.collection"
                              :key="item.name"
                              class="flex"
                            >
                              <NuxtLink
                                :to="item.href"
                                class="font-medium text-gray-500"
                                >{{ item.name }}</NuxtLink
                              >
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p
                            id="mobile-brand-heading"
                            class="font-medium text-gray-900"
                          >
                            Brands
                          </p>
                          <ul
                            role="list"
                            aria-labelledby="mobile-brand-heading"
                            class="mt-6 space-y-6"
                          >
                            <li
                              v-for="item in category.brands"
                              :key="item.name"
                              class="flex"
                            >
                              <NuxtLink
                                :to="item.href"
                                class="font-medium text-gray-500"
                                >{{ item.name }}</NuxtLink
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div
                  v-for="page in navigation.pages"
                  :key="page.name"
                  class="flow-root"
                >
                  <NuxtLink
                    :to="page.href"
                    class="-m-2 block p-2 font-medium text-gray-900"
                    >{{ page.name }}</NuxtLink
                  >
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <header class="relative z-10">
      <div class="bg-white">
        <div class="border-b border-gray-200">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
              <!-- Logo (lg+) -->
              <div class="hidden lg:flex lg:items-center">
                <NuxtLink to="/" class="flex items-center">
                  <img
                    class="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt=""
                  />
                  <span class="ml-3 text-xl font-semibold text-gray-900">
                    Nuxt Hub
                  </span>
                </NuxtLink>
              </div>

              <div class="hidden h-full lg:flex">
                <!-- Mega menus -->
                <PopoverGroup class="ml-8">
                  <div class="flex h-full justify-center space-x-8">
                    <Popover
                      v-for="(category, categoryIdx) in navigation.categories"
                      :key="category.name"
                      v-slot="{ open }"
                      class="flex"
                    >
                      <div class="relative flex">
                        <PopoverButton
                          :class="[
                            open
                              ? 'border-indigo-600 text-indigo-600'
                              : 'border-transparent text-gray-700 hover:text-gray-800',
                            'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out',
                          ]"
                          >{{ category.name }}</PopoverButton
                        >
                      </div>

                      <transition
                        enter-active-class="transition ease-out duration-200"
                        enter-from-class="opacity-0"
                        enter-to-class="opacity-100"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                      >
                        <PopoverPanel
                          class="absolute inset-x-0 top-full text-gray-500 sm:text-sm"
                        >
                          <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                          <div
                            class="absolute inset-0 top-1/2 bg-white shadow"
                            aria-hidden="true"
                          />

                          <div class="relative bg-white">
                            <div class="mx-auto max-w-7xl px-8">
                              <div
                                class="grid grid-cols-2 items-start gap-x-8 gap-y-10 pt-10 pb-12"
                              >
                                <div class="grid grid-cols-2 gap-x-8 gap-y-10">
                                  <div>
                                    <p
                                      :id="`desktop-featured-heading-${categoryIdx}`"
                                      class="font-medium text-gray-900"
                                    >
                                      Featured
                                    </p>
                                    <ul
                                      role="list"
                                      :aria-labelledby="`desktop-featured-heading-${categoryIdx}`"
                                      class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      <li
                                        v-for="item in category.featured"
                                        :key="item.name"
                                        class="flex"
                                      >
                                        <NuxtLink
                                          :to="item.href"
                                          class="font-medium hover:text-gray-800"
                                          >{{ item.name }}</NuxtLink
                                        >
                                      </li>
                                    </ul>
                                  </div>
                                  <div>
                                    <p
                                      id="desktop-categories-heading"
                                      class="font-medium text-gray-900"
                                    >
                                      Categories
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby="desktop-categories-heading"
                                      class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      <li
                                        v-for="item in category.categories"
                                        :key="item.name"
                                        class="flex"
                                      >
                                        <NuxtLink
                                          :to="item.href"
                                          class="font-medium hover:text-gray-800"
                                          >{{ item.name }}
                                        </NuxtLink>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div class="grid grid-cols-2 gap-x-8 gap-y-10">
                                  <div>
                                    <p
                                      id="desktop-collection-heading"
                                      class="font-medium text-gray-900"
                                    >
                                      Collection
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby="desktop-collection-heading"
                                      class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      <li
                                        v-for="item in category.collection"
                                        :key="item.name"
                                        class="flex"
                                      >
                                        <NuxtLink
                                          :to="item.href"
                                          class="font-medium hover:text-gray-800"
                                          >{{ item.name }}</NuxtLink
                                        >
                                      </li>
                                    </ul>
                                  </div>

                                  <div>
                                    <p
                                      id="desktop-brand-heading"
                                      class="font-medium text-gray-900"
                                    >
                                      Brands
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby="desktop-brand-heading"
                                      class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      <li
                                        v-for="item in category.brands"
                                        :key="item.name"
                                        class="flex"
                                      >
                                        <NuxtLink
                                          :to="item.href"
                                          class="font-medium hover:text-gray-800"
                                          >{{ item.name }}</NuxtLink
                                        >
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </PopoverPanel>
                      </transition>
                    </Popover>

                    <NuxtLink
                      v-for="page in navigation.pages"
                      :key="page.name"
                      :to="page.href"
                      class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >{{ page.name }}</NuxtLink
                    >
                  </div>
                </PopoverGroup>
              </div>

              <!-- Mobile menu and search (lg-) -->
              <div class="flex flex-1 items-center lg:hidden">
                <button
                  type="button"
                  class="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  @click="mobileMenuOpen = true"
                >
                  <span class="sr-only">Open menu</span>
                  <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>

                <!-- Search -->
                <a href="#" class="ml-2 p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              <!-- Logo (lg-) -->
              <NuxtLink to="/" class="flex items-center lg:hidden">
                <img
                  class="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                  alt=""
                />
                <span class="ml-3 text-xl font-semibold text-gray-900">
                  Nuxt Hub
                </span>
              </NuxtLink>

              <div class="flex flex-1 items-center justify-end">
                <div class="flex items-center lg:ml-8">
                  <div class="flex space-x-8">
                    <div class="hidden lg:flex">
                      <a
                        href="#"
                        class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Search</span>
                        <MagnifyingGlassIcon
                          class="h-6 w-6"
                          aria-hidden="true"
                        />
                      </a>
                    </div>

                    <div class="flow-root">
                      <!-- Cart -->
                      <Popover class="text-sm lg:relative">
                        <PopoverButton class="group -m-2 flex items-center p-2">
                          <ShoppingBagIcon
                            class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span
                            class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                            >0</span
                          >
                          <span class="sr-only">items in cart, view bag</span>
                        </PopoverButton>
                        <transition
                          enter-active-class="transition ease-out duration-200"
                          enter-from-class="opacity-0"
                          enter-to-class="opacity-100"
                          leave-active-class="transition ease-in duration-150"
                          leave-from-class="opacity-100"
                          leave-to-class="opacity-0"
                        >
                          <PopoverPanel
                            class="lg:ring-opacity-5 absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:right-0 lg:left-auto lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black"
                          >
                            <h2 class="sr-only">Shopping Cart</h2>

                            <form class="mx-auto max-w-2xl px-4">
                              <ul role="list" class="divide-y divide-gray-200">
                                <li
                                  v-for="product in products"
                                  :key="product.id"
                                  class="flex items-center py-6"
                                >
                                  <img
                                    :src="product.imageSrc"
                                    :alt="product.imageAlt"
                                    class="h-16 w-16 flex-none rounded-md border border-gray-200"
                                  />
                                  <div class="ml-4 flex-auto">
                                    <h3 class="font-medium text-gray-900">
                                      <NuxtLink :to="product.href">{{
                                        product.name
                                      }}</NuxtLink>
                                    </h3>
                                    <div class="mt-1 flex">
                                      <p class="font-medium text-gray-500">
                                        ${{ product.price }}
                                      </p>
                                      <p
                                        class="ml-auto font-medium text-gray-500"
                                      >
                                        Qty: {{ product.color }}
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              </ul>

                              <button
                                type="submit"
                                class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none"
                              >
                                Checkout
                              </button>

                              <p class="mt-6 text-center">
                                <a
                                  href="#"
                                  class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                  >View Shopping Bag</a
                                >
                              </p>
                            </form>
                          </PopoverPanel>
                        </transition>
                      </Popover>
                    </div>
                  </div>

                  <span
                    class="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                    aria-hidden="true"
                  />

                  <div class="flex">
                    <div v-if="user">
                      <UButton
                        label="Sign out"
                        color="neutral"
                        variant="outline"
                        @click.prevent="handleSignOut"
                      />
                    </div>
                    <div v-else>
                      <UButton
                        label="Sign in"
                        color="neutral"
                        variant="outline"
                      >
                        <NuxtLink to="/sign-in">Sign in</NuxtLink>
                      </UButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import type { User } from "firebase/auth";
import { signOut } from "~/lib/firebase";
import { useRouter } from "vue-router";

const navigation = {
  categories: [
    {
      name: "Women",
      featured: [
        { name: "Newest", href: "#" },
        { name: "Popular", href: "#" },
        { name: "Best Sellers", href: "#" },
        { name: "Trending", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Basic Tees", href: "#" },
        { name: "Artwork Tees", href: "#" },
        { name: "Bottoms", href: "#" },
        { name: "Accessories", href: "#" },
      ],
      brands: [
        { name: "Full Nelson", href: "#" },
        { name: "My Way", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Counterfeit", href: "#" },
      ],
    },
    {
      name: "Men",
      featured: [
        { name: "Casual", href: "#" },
        { name: "Boxers", href: "#" },
        { name: "Outdoor", href: "#" },
        { name: "Formal", href: "#" },
      ],
      collection: [
        { name: "Everything", href: "#" },
        { name: "Core", href: "#" },
        { name: "New Arrivals", href: "#" },
        { name: "Sale", href: "#" },
      ],
      categories: [
        { name: "Artwork Tees", href: "#" },
        { name: "Pants", href: "#" },
        { name: "Accessories", href: "#" },
        { name: "Boxers", href: "#" },
      ],
      brands: [
        { name: "My Way", href: "#" },
        { name: "Counterfeit", href: "#" },
        { name: "Re-Arranged", href: "#" },
        { name: "Full Nelson", href: "#" },
      ],
    },
  ],
  pages: [
    { name: "Products", href: "/products" },
    { name: "Blogs", href: "/blogs" },
    { name: "Dashboard", href: "/dashboard" },
  ],
};

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    price: 140,
    color: "Salmon",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    price: 250,
    color: "Blue",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

const toast = useToast();
const router = useRouter();

const userStore = useUserStore();
// const cartStore = useCartStore();
// const products = computed(() => cartStore.cart);
const user = computed(() => userStore.user) as Ref<{
  name: string;
  email: string;
  imageUrl: string;
} | null>;

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

const mobileMenuOpen = ref(false);
</script>

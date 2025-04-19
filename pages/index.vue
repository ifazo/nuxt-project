<template>
  <div>
    <div
      class="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8"
    >
      <aside class="sticky top-8 hidden w-45 shrink-0 lg:block">
        <!-- Left column area -->
        <div class="hidden lg:block">
          <h2 class="text-lg font-medium text-gray-900">Recent Blogs</h2>
          <ul role="list" class="mt-6 space-y-4">
            <li
              v-for="(blog, index) in blogs"
              :key="index"
              class="flex items-center space-x-3"
            >
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">
                  {{ blog.title }}
                </p>
                <p class="text-sm text-gray-500">{{ blog.description }}</p>
                <p class="text-xs text-gray-400">{{ blog.date }}</p>
              </div>
            </li>
          </ul>
          <div class="mt-6">
            <a
              href="#"
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all blogs
            </a>
          </div>
        </div>
      </aside>

      <main class="flex-1">
        <!-- Main area -->
        <AppFeature />
      </main>

      <aside class="sticky top-8 hidden w-60 shrink-0 xl:block">
        <!-- Right column area -->
        <div class="hidden lg:block">
          <h2 class="text-lg font-medium text-gray-900">Top Products</h2>
          <ul role="list" class="mt-6 space-y-4">
            <li
              v-for="(product, index) in products"
              :key="index"
              class="flex items-center space-x-3"
            >
              <img
                :src="product.image"
                alt=""
                class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200"
              />
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">
                  {{ product.name }}
                </p>
                <p class="text-sm text-gray-500">{{ product.description }}</p>
                <p class="text-xs text-gray-400">{{ product.price }}</p>
              </div>
            </li>
          </ul>
          <div class="mt-6">
            <a
              href="#"
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all products
            </a>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppFeature from "~/components/AppFeature.vue";

const blogs = [
  {
    title: "Blog Post 1",
    description: "This is the description for blog post 1.",
    date: "2023-10-01",
  },
  {
    title: "Blog Post 2",
    description: "This is the description for blog post 2.",
    date: "2023-10-02",
  },
  {
    title: "Blog Post 3",
    description: "This is the description for blog post 3.",
    date: "2023-10-03",
  },
  {
    title: "Blog Post 4",
    description: "This is the description for blog post 4.",
    date: "2023-10-04",
  },
  {
    title: "Blog Post 5",
    description: "This is the description for blog post 5.",
    date: "2023-10-05",
  },
];

const products = [
  {
    name: "Product 1",
    image: "https://i.ibb.co.com/DLNnXjT/r5-500x500.jpg",
    description: "This is the description for product 1.",
    price: "$10.00",
  },
  {
    name: "Product 2",
    image: "https://i.ibb.co.com/DLNnXjT/r5-500x500.jpg",
    description: "This is the description for product 2.",
    price: "$20.00",
  },
  {
    name: "Product 3",
    image: "https://i.ibb.co.com/DLNnXjT/r5-500x500.jpg",
    description: "This is the description for product 3.",
    price: "$30.00",
  },
  {
    name: "Product 4",
    image: "https://i.ibb.co.com/DLNnXjT/r5-500x500.jpg",
    description: "This is the description for product 4.",
    price: "$40.00",
  },
  {
    name: "Product 5",
    image: "https://i.ibb.co.com/DLNnXjT/r5-500x500.jpg",
    description: "This is the description for product 5.",
    price: "$50.00",
  },
];
</script>

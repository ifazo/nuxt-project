<template>
  <div>
    <div
      class="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8"
    >
      <aside class="sticky top-8 hidden w-60 shrink-0 lg:block">
        <!-- Left column area -->
        <div class="flex flex-col gap-y-4">
          <div class="flex items-center gap-x-2">
            <h1 class="text-xl font-bold">Recent Blogs</h1>
          </div>
          <div class="flex flex-col gap-y-2">
            <div
              v-for="(blog, index) in blogs"
              :key="index"
              class="p-4 border-b border-gray-200"
            >
              <h2 class="text-lg font-semibold">{{ blog.title }}</h2>
              <p class="text-sm text-gray-500">{{ blog.date }}</p>
              <p class="text-gray-700">{{ blog.description }}</p>
            </div>
          </div>
        </div>
      </aside>

      <main class="flex-1">
        <!-- Main area -->
        <AppFeature />
      </main>

      <aside class="sticky top-8 hidden w-60 shrink-0 xl:block">
        <!-- Right column area -->
        <div class="flex flex-col gap-y-4">
          <div class="flex items-center gap-x-2">
            <h1 class="text-xl font-bold">Top Products</h1>
          </div>
          <div class="flex flex-col gap-y-2">
            <div
              v-for="(product, index) in products"
              :key="index"
              class="p-4 border-b border-gray-200"
            >
              <img
                :src="product.image"
                alt=""
                class="w-full h-32 object-cover mb-2"
              />
              <h2 class="text-lg font-semibold">{{ product.name }}</h2>
              <p class="text-sm text-gray-500">{{ product.price }}</p>
              <!-- <p class="text-gray-700">{{ product.description }}</p> -->
            </div>
          </div>
        </div>
      </aside>
    </div>
    <div class="bg-gray-100">
      <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900">
          Featured Products
        </h2>
        <AppFeature />
      </div>
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
];
</script>

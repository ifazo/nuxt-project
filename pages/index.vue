<template>
  <div>
    <div
      class="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-8 sm:px-6 lg:px-8"
    >
      <aside class="sticky top-8 hidden w-50 shrink-0 lg:block">
        <!-- Left column area -->
        <div class="hidden lg:block">
          <div v-if="blogs.length">
            <h2 class="text-lg font-medium text-gray-900">Featured Blogs</h2>
          <ul role="list" class="mt-6 space-y-4">
            <li
              v-for="blog in blogs"
              :key="blog.id"
              class="flex items-center space-x-3"
            >
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">
                  {{ blog.title }}
                </p>
                <p class="text-sm text-gray-500">{{ blog.description.slice(0, 25) }}...</p>
                <p 
                v-if="blog.createdAt"
                class="text-xs text-gray-400">
                  {{
    new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(blog.createdAt))
  }}
                </p>
              </div>
            </li>
          </ul>
          <div class="mt-6">
            <NuxtLink
              to="/blogs"
              class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View all blogs
              <span aria-hidden="true"> &rarr;</span>
            </NuxtLink>
          </div>
          </div>
          <div v-else>
            <p class="mt-2 text-sm text-gray-500">
              Blogs are loading, please wait...
            </p>
            </div>
        </div>
      </aside>

      <main class="flex-1">
        <!-- Main area -->
        <AppFeature />
      </main>

      <aside class="sticky top-8 hidden w-50 shrink-0 xl:block">
        <!-- Right column area -->
        <div class="hidden lg:block">
          <div v-if="products.length">
            <h2 class="text-lg font-medium text-gray-900">Featured Product</h2>
            <ul role="list" class="mt-6 space-y-4">
              <li
                v-for="product in products"
                :key="product.id"
                class="flex items-center space-x-3"
              >
                <img
                  :src="product.images[0]"
                  alt=""
                  class="h-12 w-12 flex-shrink-0 rounded-sm bg-gray-200"
                >
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900">
                    {{
                      product.title.length > 20
                        ? product.title.slice(0, 20) + "..."
                        : product.title
                    }}
                  </p>
                  <p class="text-sm text-gray-500">{{ product.shopName }}</p>
                  <p class="text-xs text-gray-400">${{ product.price }}</p>
                </div>
              </li>
            </ul>
            <div class="mt-6">
              <NuxtLink
                to="/products"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all products
                <span aria-hidden="true"> &rarr;</span>
              </NuxtLink>
            </div>
          </div>
          <div v-else>
            <p class="mt-2 text-sm text-gray-500">
              Products are loading, please wait...
            </p>
          </div>
        </div>
      </aside>
    </div>
    <FeaturedCategory />
    <FeaturedShop />
  </div>
</template>

<script setup lang="ts">
import type { Blog, Product } from "@prisma/client";
import AppFeature from "~/components/AppFeature.vue";
import FeaturedCategory from "~/components/FeaturedCategory.vue";
import FeaturedShop from "~/components/FeaturedShop.vue";

const products = ref<Product[]>([]);
const blogs = ref<Blog[]>([]);

onMounted(async () => {
  try {
    const blogsData = await $fetch<Blog[]>("/api/blogs?random=5");
    if (blogsData && blogsData.length > 0) {
      blogs.value = blogsData;
    } else {
      console.error("No blogs found");
    }
    const productsData = await $fetch<Product[]>("/api/products?random=5");
    if (productsData && productsData.length > 0) {
      products.value = productsData;
    } else {
      console.error("No products found");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

// const blogs = [
//   {
//     title: "Blog Post 1",
//     description: "This is the description for blog post 1.",
//     date: "2023-10-01",
//   },
//   {
//     title: "Blog Post 2",
//     description: "This is the description for blog post 2.",
//     date: "2023-10-02",
//   },
//   {
//     title: "Blog Post 3",
//     description: "This is the description for blog post 3.",
//     date: "2023-10-03",
//   },
//   {
//     title: "Blog Post 4",
//     description: "This is the description for blog post 4.",
//     date: "2023-10-04",
//   },
//   {
//     title: "Blog Post 5",
//     description: "This is the description for blog post 5.",
//     date: "2023-10-05",
//   },
// ];
</script>

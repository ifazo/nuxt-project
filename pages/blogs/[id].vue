<template>
  <div class="bg-white py-8">
    <div v-if="blog" class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row"
      >
        <div class="w-full lg:max-w-4xl lg:flex-auto">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {{ blog.title }}
          </h2>
          <p class="mt-6 text-xl leading-8 text-gray-600">
            {{ blog.description }}
          </p>
          <img
            :src="blog.image"
            alt=""
            class="mt-8 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
          >
        </div>
        <div class="w-full lg:max-w-md lg:flex-auto">
          <h3 class="py-8 text-2xl leading-7 font-bold text-indigo-600">
            Related products
          </h3>
          <ul class="-my-4 divide-y divide-gray-100">
            <li v-for="product in products" :key="product.id" class="py-4">
              <div class="flex items-start gap-4">
                <!-- Product Image -->
                <img
                  :src="product.images[0]"
                  alt=""
                  class="h-24 w-24 rounded-md object-cover"
                >
                <dl class="relative flex flex-wrap gap-x-3">
                  <dt class="sr-only">Role</dt>
                  <dd
                    class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900"
                  >
                    <NuxtLink :to="`/products/${product.id}`">
                      {{ product.title }}
                      <span class="absolute inset-0" aria-hidden="true" />
                    </NuxtLink>
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd
                    class="mt-2 w-full flex-none text-base leading-7 text-gray-600"
                  >
                    {{ product.description }}
                  </dd>
                  <dt class="sr-only">Salary</dt>
                  <dd
                    class="mt-2 text-base leading-7 font-semibold text-gray-900"
                  >
                    ${{ product.price }}
                  </dd>
                  <dt class="sr-only">Shop</dt>
                  <dd
                    class="mt-2 flex items-center gap-x-3 text-base leading-7 text-gray-500"
                  >
                    <svg
                      viewBox="0 0 2 2"
                      class="h-0.5 w-0.5 flex-none fill-gray-300"
                      aria-hidden="true"
                    >
                      <circle cx="1" cy="1" r="1" />
                    </svg>
                    {{ product.shopName }}
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
          <div class="my-4 flex border-t border-gray-100 pt-4">
            <NuxtLink
              :to="'/products'"
              class="text-sm leading-6 font-semibold text-indigo-600 hover:text-indigo-500"
              >View all products <span aria-hidden="true">&rarr;</span>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div
        class="mt-8 text-base leading-7 text-gray-600"
        v-html="blog.content"
      />
    </div>
    <div v-else class="flex h-screen items-center justify-center bg-white">
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Blog, Product } from "@prisma/client";
import { useRoute } from "vue-router";

type IBlog = {
  blog: Blog;
  products: Product[];
};

const route = useRoute();

const blog = ref<Blog | null>(null);
const products = ref<Product[]>([]);

onMounted(async () => {
  const blogId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  try {
    const data = await $fetch<IBlog>(`/api/blogs/${blogId}`);
    if (data) {
      console.log(data);
      blog.value = data.blog;
      products.value = data.products;
    } else {
      console.error("Blog not found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
});
// const products = [
//   {
//     id: 1,
//     role: "Full-time designer",
//     href: "#",
//     image:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-01.jpg",
//     description:
//       "Quos sunt ad dolore ullam qui. Enim et quisquam dicta molestias.",
//     salary: "$75,000 USD",
//     location: "San Francisco, CA",
//   },
//   {
//     id: 2,
//     role: "Laravel developer",
//     href: "#",
//     image:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-02.jpg",
//     description:
//       "Et veniam et officia dolorum rerum. Et voluptas consequatur magni sapiente.",
//     salary: "$125,000 USD",
//     location: "San Francisco, CA",
//   },
//   {
//     id: 3,
//     role: "React Native developer",
//     href: "#",
//     image:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-03.jpg",
//     description:
//       "Veniam ipsam nisi quas architecto eos non voluptatem in nemo.",
//     salary: "$105,000 USD",
//     location: "San Francisco, CA",
//   },
//   {
//     id: 4,
//     role: "React Native developer",
//     href: "#",
//     image:
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-04.jpg",
//     description:
//       "Veniam ipsam nisi quas architecto eos non voluptatem in nemo.",
//     salary: "$105,000 USD",
//     location: "San Francisco, CA",
//   },
// ];
</script>

<template>
  <div class="bg-white py-8">
    <div v-if="blog" class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto flex max-w-2xl flex-col items-start justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row"
      >
        <div class="w-full lg:max-w-4xl lg:flex-auto">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            {{ blog.title }}
          </h2>
          <div class="relative mt-8 flex items-center gap-x-4">
            <img
              :src="blog.user.image"
              alt=""
              class="size-10 rounded-full bg-gray-50"
            >
            <div class="text-sm/6">
              <p class="font-semibold text-gray-900">
                <!-- <a :href="post.author.href"> -->
                <span class="absolute inset-0" />
                {{ blog.user.name }}
                <!-- </a> -->
              </p>
              <p v-if="blog.createdAt" class="text-gray-600">
                Published:
                <time datetime="2020-01-07">
                  {{ new Date(blog.createdAt).toLocaleDateString() }}
                </time>
              </p>
            </div>
          </div>
          <p class="mt-6 text-xl leading-8 text-gray-600">
            {{ blog.description }}
          </p>
          <img
            :src="blog.image"
            alt=""
            class="mt-8 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
          >
          <div
            class="prose prose-sm mt-4 max-w-none text-gray-600"
            v-html="sanitizedContent"
          />
          <div class="mt-4 flex flex-wrap gap-4">
            <span
              v-for="(tag, index) in blog.tags"
              :key="index"
              class="inline-flex items-center rounded-md bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 ring-1 ring-indigo-600/10 ring-inset"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="w-full lg:max-w-md lg:flex-auto">
          <h3 class="pb-8 text-2xl leading-7 font-bold text-indigo-600">
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
                  <dd
                    class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900"
                  >
                    <NuxtLink :to="`/products/${product.id}`">
                      {{ product.title }}
                      <span class="absolute inset-0" aria-hidden="true" />
                    </NuxtLink>
                  </dd>
                  <dd
                    class="mt-2 w-full flex-none text-base leading-7 text-gray-600"
                  >
                    {{ product.description }}
                  </dd>
                  <dd
                    class="mt-2 text-base leading-7 font-semibold text-gray-900"
                  >
                    ${{ product.price }}
                  </dd>
                  <dd
                    class="mt-2 flex items-center gap-x-3 text-base leading-7 font-medium text-gray-600"
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
          <div class="border-t border-gray-100 pt-4">
            <h3 class="my-4 text-sm font-medium text-gray-700">
              Write a review
            </h3>
            <BlogReview :blog-id="blog.id" />
            <BlogReviews
              :blog-id="blog.id"
              @update-reviews="handleReviewsUpdate"
            />
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
import type { Blog, Product } from "@prisma/client";
import { useRoute } from "vue-router";
import DOMPurify from "dompurify";
import BlogReview from "~/components/BlogReview.vue";
import BlogReviews from "~/components/BlogReviews.vue";

type IBlog = {
  blog: Blog & {
    user: {
      name: string;
      image: string;
    };
  };
  products: Product[];
};
const route = useRoute();

const blog = ref<IBlog["blog"] | null>(null);
const products = ref<Product[]>([]);

const reviewLengths = ref(0);
const averageRatings = ref(0.0);

const handleReviewsUpdate = ({
  reviewLength,
  averageRating,
}: {
  reviewLength: number;
  averageRating: number;
}) => {
  reviewLengths.value = reviewLength;
  averageRatings.value = averageRating;
};

const sanitizedContent = computed(() =>
  blog.value ? DOMPurify.sanitize(blog.value.content) : "",
);

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
</script>

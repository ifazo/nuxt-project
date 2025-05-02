<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-3 py-4 lg:px-6 lg:py-8">
      <div class="mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Blog List
        </h2>
        <NuxtLink
          to="/dashboard/blogs/add"
          class="text-md mt-2 leading-8 text-indigo-600"
        >
          Write a new blog
          <span aria-hidden="true"> &rarr;</span>
        </NuxtLink>
        <div
          class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16"
        >
          <article
            v-for="blog in blogs"
            :key="blog.id"
            class="flex max-w-xl flex-col items-start justify-between"
          >
            <div class="flex items-center gap-x-4 text-xs">
              <!-- <time :datetime="post.datetime" class="text-gray-500">{{
                post.date
              }}</time>
              <a
                :href="post.category.href"
                class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >{{ post.category.title }}</a
              > -->
            </div>
            <div class="group relative">
              <h3
                class="mt-3 text-lg leading-6 font-semibold text-gray-900 group-hover:text-gray-600"
              >
                <a :href="blog.id">
                  <span class="absolute inset-0" />
                  {{ blog.title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                {{ blog.description }}
              </p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
              <img
                v-if="blog.user.image"
                :src="blog.user.image"
                alt=""
                class="h-10 w-10 rounded-full bg-gray-50"
              >
              <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900">
                  <!-- <a :href="post.author.href"> -->
                  <span class="absolute inset-0" />
                  {{ blog.user.name }}
                  <!-- </a> -->
                </p>
                <p class="text-gray-600">{{ blog.user.name }}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { UserCircleIcon } from "@heroicons/vue/24/outline";
import type { Blog, User } from "@prisma/client";

type Blogs = Blog & {
  user: User;
};

const blogs = ref<Blogs[]>([]);

onMounted(async () => {
  try {
    const data = await $fetch<Blogs[]>("/api/blogs");
    if (data && data.length > 0) {
      blogs.value = data;
    } else {
      console.error("No blogs found");
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
});

definePageMeta({
  layout: "dashboard",
});
</script>

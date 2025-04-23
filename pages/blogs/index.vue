<template>
  <div class="bg-white py-4 sm:py-8">
    <div v-if="blogs.length" class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          Blogs
        </h2>
      </div>
      <div
        class="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        <article
          v-for="blog in blogs"
          :key="blog.id"
          class="flex flex-col items-start justify-between"
        >
          <div class="relative w-full">
            <img
              :src="blog.image"
              alt=""
              class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
            >
            <div
              class="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 ring-inset"
            />
          </div>
          <div class="max-w-xl">
            <div class="mt-8 flex items-center gap-x-4 text-xs">
              <time
                v-if="blog.createdAt"
                :datetime="new Date(blog.createdAt).toISOString()"
                class="font-medium text-gray-500"
              >
                {{ formatDate(blog.createdAt) }}
              </time>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="(tag, index) in blog.tags"
                  :key="index"
                  class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {{ tag }}
                </div>
              </div>
            </div>
            <div class="group relative">
              <h3
                class="mt-3 text-lg leading-6 font-semibold text-gray-900 group-hover:text-gray-600"
              >
                <NuxtLink :to="'/blogs/' + blog.id">
                  <span class="absolute inset-0" />
                  {{ blog.title }}
                </NuxtLink>
              </h3>
              <p
                class="mt-5 line-clamp-3 text-sm leading-6 font-medium text-gray-600"
              >
                {{
                  blog.description.length > 100
                    ? blog.description.slice(0, 100) + "..."
                    : blog.description
                }}
              </p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
              <img
                v-if="blog.user.image"
                :src="blog.user.image"
                alt=""
                class="h-10 w-10 rounded-full bg-gray-100"
              >
              <UserCircleIcon
                v-else
                class="h-10 w-10 rounded-full bg-gray-100"
                aria-hidden="true"
              />
              <div class="text-sm leading-6">
                <div class="font-semibold text-gray-900">
                  <span class="absolute inset-0" />
                  {{ blog.user.name }}
                </div>
                <p class="font-medium text-gray-600">Writer</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div v-else class="flex h-screen items-center justify-center bg-white">
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon } from "@heroicons/vue/24/outline";
import type { Blog, User } from "@prisma/client";

type Blogs = Blog & {
  user: User;
};

const blogs = ref<Blogs[]>([]);

const formatDate = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

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
</script>

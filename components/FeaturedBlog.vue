<template>
  <div>
    <div v-if="blogs.length">
      <h2 class="text-lg font-medium text-gray-900">Featured Blogs</h2>
      <ul role="list" class="mt-6 space-y-4">
        <li
          v-for="blog in blogs"
          :key="blog.id"
          class="flex items-center space-x-3"
        >
          <NuxtLink :to="`/blogs/${blog.id}`" class="min-w-0 flex-1">
            <p class="text-sm font-medium text-gray-900">
              {{ blog.title }}
            </p>
            <p class="text-sm text-gray-500">
              {{ blog.description.slice(0, 25) }}...
            </p>
            <p v-if="blog.createdAt" class="text-xs text-gray-400">
              {{
                new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(blog.createdAt))
              }}
            </p>
          </NuxtLink>
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
    <!-- Blogs Skeleton -->
    <div v-else>
      <div class="h-7 w-32 animate-pulse rounded bg-gray-200" />
      <ul role="list" class="mt-6 space-y-4">
        <li v-for="i in 5" :key="i" class="flex items-center space-x-3">
          <div class="min-w-0 flex-1">
            <!-- Blog Title Skeleton -->
            <div class="h-5 w-36 animate-pulse rounded bg-gray-200" />
            <!-- Blog Description Skeleton -->
            <div class="mt-1 h-4 w-40 animate-pulse rounded bg-gray-200" />
            <!-- Blog Date Skeleton -->
            <div class="mt-1 h-3 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </li>
      </ul>
      <div class="mt-6">
        <!-- View All Link Skeleton -->
        <div class="h-5 w-28 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Blog } from "@prisma/client";

const blogs = ref<Blog[]>([]);

onMounted(async () => {
  try {
    const blogsData = await $fetch<Blog[]>("/api/blogs?random=5");
    if (blogsData && blogsData.length > 0) {
      blogs.value = blogsData;
    } else {
      console.error("No blogs found");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});
</script>

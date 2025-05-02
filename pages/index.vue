<template>
  <div>
    <div
      class="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-8 sm:px-6 lg:px-8"
    >
      <aside class="sticky top-8 hidden w-50 shrink-0 lg:block">
        <!-- Left column area -->
        <div class="hidden lg:block">
          <FeaturedBlog />
        </div>
      </aside>

      <main class="flex-1">
        <!-- Main area -->
        <AppFeature />
      </main>

      <aside class="sticky top-8 hidden w-50 shrink-0 xl:block">
        <!-- Right column area -->
        <div class="hidden lg:block">
          <FeaturedProduct />
        </div>
      </aside>
    </div>
    <FeaturedCategory />
    <FeaturedShop />
    <AppIncentive />
  </div>
</template>

<script setup lang="ts">
import AppFeature from "~/components/AppFeature.vue";
import FeaturedBlog from "~/components/FeaturedBlog.vue";
import FeaturedProduct from "~/components/FeaturedProduct.vue";
import FeaturedCategory from "~/components/FeaturedCategory.vue";
import FeaturedShop from "~/components/FeaturedShop.vue";
import AppIncentive from "~/components/AppIncentive.vue";
</script>

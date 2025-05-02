<template>
  <div class="bg-white">
    <div class="mx-auto max-w-7xl px-4 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base/7 font-semibold text-indigo-600">Welcome here!</h2>
        <p
          class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance"
        >
          Nuxty provide all of the tools you needs.
        </p>
        <p class="mt-6 text-lg/8 text-gray-600">
          We provide a lot of features to help you build your application.
          <br >
          You can use our tools to build your application faster and easier.
          <br >
          We provide a lot of features to help you build your application.
        </p>
      </div>
      <div class="mx-auto mt-6 max-w-2xl lg:max-w-4xl">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-4 lg:max-w-none lg:grid-cols-2 lg:gap-y-8"
        >
          <div
            v-for="feature in features"
            :key="feature.name"
            class="relative pl-16"
          >
            <dt class="text-base/7 font-semibold text-gray-900">
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600"
              >
                <Icon
                  :icon="feature.icon"
                  class="size-6 text-white"
                  aria-hidden="true"
                />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

const features = [
  {
    name: "Products and services",
    description: "Buying and selling products and services.",
    icon: "lucide:shopping-cart",
  },
  {
    name: "Shops and categories",
    description: "Creating and managing shops and categories.",
    icon: "lucide:store",
  },
  {
    name: "Blog and articles",
    description: "Creating and managing blog and articles.",
    icon: "lucide:edit",
  },
  {
    name: "User and authentication",
    description: "Creating and managing users and authentication.",
    icon: "lucide:user-check",
  },
];
</script>

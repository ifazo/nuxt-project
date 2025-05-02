<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
-->
<template>
  <div class="bg-white">
    <div v-if="product" class="mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <ProductBreadcrumb :title="product.title" />
      <!-- Product -->
      <div
        class="py-8 lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16"
      >
        <!-- Product image -->
        <TabGroup as="div" class="lg:col-span-4 lg:row-end-1">
          <!-- Image selector -->
          <TabPanels class="aspect-h-1 aspect-w-1 w-full">
            <TabPanel v-for="(image, index) in product.images" :key="index">
              <img
                :src="image"
                alt=""
                class="h-96 w-full object-cover object-center sm:rounded-lg"
              >
            </TabPanel>
          </TabPanels>
          <!-- Thumbnail selector -->
          <div
            class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none"
          >
            <TabList class="grid grid-cols-4 gap-6">
              <Tab
                v-for="(image, index) in product.images"
                :key="index"
                v-slot="{ selected }"
                class="focus:ring-opacity-50 relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring focus:ring-offset-4 focus:outline-none"
              >
                <span class="sr-only">{{ image }}</span>
                <span class="absolute inset-0 overflow-hidden rounded-md">
                  <img
                    :src="image"
                    alt=""
                    class="h-full w-full object-cover object-center"
                  >
                </span>
                <span
                  :class="[
                    selected ? 'ring-indigo-500' : 'ring-transparent',
                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                  ]"
                  aria-hidden="true"
                />
              </Tab>
            </TabList>
          </div>
        </TabGroup>
        <!-- Product details -->
        <div
          class="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none"
        >
          <div class="flex flex-col">
            <div class="mb-4">
              <h1
                class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              >
                {{ product.title }}
              </h1>
              <div class="mt-2 flex items-center justify-between">
                <p class="text-md font-bold text-gray-500">
                  Shop: {{ product.shopName }}
                </p>
                <p class="text-md font-bold text-gray-500">
                  Category: {{ product.categoryName }}
                </p>
              </div>
            </div>

            <div>
              <h3 class="sr-only">Reviews</h3>
              <div class="flex items-center">
                <StarIcon
                  v-for="rating in [0, 1, 2, 3, 4]"
                  :key="rating"
                  :class="[
                    averageRatings > rating
                      ? 'text-yellow-400'
                      : 'text-gray-300',
                    'h-5 w-5 flex-shrink-0',
                  ]"
                  aria-hidden="true"
                />
                <div class="mx-2 flex items-center">
                  <p class="font-medium text-gray-500">
                    {{ averageRatings }} out of 5 stars
                  </p>
                  <p
                    class="ml-1 font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    ({{ reviewLengths }} reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p class="mt-6 text-gray-500">{{ product.description }}</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <button
              type="button"
              class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none"
              @click.prevent="handlePayment({ ...product, quantity: quantity })"
            >
              Buy ${{ product.price }}
            </button>
            <button
              type="button"
              class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none"
              @click="addToCartHandler(product)"
            >
              Add to cart
            </button>
          </div>

          <div class="mt-10 border-t border-gray-200 pt-10">
            <h3 class="text-sm font-medium text-gray-900">Highlights</h3>
            <div class="prose prose-sm mt-4">
              <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                <li
                  v-for="highlight in product.highlights"
                  :key="highlight"
                  class="text-gray-400"
                >
                  <span class="text-gray-600">{{ highlight }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-10 border-t border-gray-200 pt-10">
            <h3 class="text-sm font-medium text-gray-900">Tags</h3>
            <div class="mt-4">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="mr-1.5 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-sm font-medium text-gray-800"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="mt-10 border-t border-gray-200 pt-10">
            <h3 class="text-sm font-medium text-gray-900">Share</h3>
            <ul role="list" class="mt-4 flex items-center space-x-6">
              <li>
                <a
                  href="#"
                  class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Share on Facebook</span>
                  <svg
                    class="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Share on Instagram</span>
                  <svg
                    class="h-6 w-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex h-6 w-6 items-center justify-center text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only">Share on X</span>
                  <svg
                    class="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none"
        >
          <h3 class="my-4 text-sm font-medium text-gray-700">Write a review</h3>
          <ProductReview :product-id="product.id" />
          <ProductReviews
            :product-id="product.id"
            @update-reviews="handleReviewsUpdate"
          />
        </div>
      </div>
    </div>
    <div v-else class="flex h-screen items-center justify-center bg-white">
      Loading...
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import { StarIcon } from "@heroicons/vue/20/solid";
import ProductBreadcrumb from "~/components/ProductBreadcrumb.vue";
import { useCartStore } from "@/stores/cart";
import { useUserStore } from "@/stores/user";
import { loadStripe } from "@stripe/stripe-js";
import ProductReview from "~/components/ProductReview.vue";
import { useRoute } from "vue-router";
import type { CartItem } from "~/stores/cart";
import type { Product } from "@prisma/client";
import ProductReviews from "~/components/ProductReviews.vue";

const route = useRoute();

const config = useRuntimeConfig();
const stripePromise = loadStripe(
  config.public.STRIPE_PUBLISHABLE_KEY as string,
);

const quantity = ref(1);
const product = ref<Product | null>(null);

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

const toast = useToast();

const cartStore = useCartStore();
const userStore = useUserStore();
const user = computed(() => userStore.user);

onMounted(async () => {
  userStore.initializeUser();
  try {
    const productId = Array.isArray(route.params.id)
      ? route.params.id[0]
      : route.params.id;

    const data = await $fetch<Product>(`/api/products/${productId}`);
    if (data) {
      product.value = data;
    } else {
      console.error("No product found");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
});

const handlePayment = async (product: CartItem) => {
  if (!user.value) {
    toast.add({
      title: "Authentication Required",
      description: "Please sign in to proceed with payment.",
      color: "warning",
    });
    return navigateTo("/sign-in");
  }
  const stripe = await stripePromise;
  if (!stripe) {
    toast.add({
      title: "Stripe Initialization Error",
      description: "Failed to initialize Stripe. Please try again later.",
      color: "error",
    });
    return;
  }
  try {
    const response = await $fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        products: [product],
        name: user.value.name,
        email: user.value.email,
      },
    });

    if (!response || !response.id) {
      throw new Error("Invalid response from server");
    }

    const result = await stripe.redirectToCheckout({ sessionId: response.id });

    if (result.error) {
      console.error("Stripe redirect error:", result.error.message);
    }
  } catch (error) {
    console.error("Error during payment:", error);
    toast.add({
      title: "Payment Error",
      description: "An error occurred while processing your payment.",
      color: "error",
    });
  }
};

const addToCartHandler = (product: Product) => {
  cartStore.addToCart(product);
  toast.add({
    title: "Success",
    description: "Product added to cart",
    color: "success",
  });
};
</script>

<template>
  <div class="bg-white">
    <div class="px-4 py-8 sm:px-6 sm:py-12 lg:px-0">
      <h1
        class="text-start text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        Shopping Cart
      </h1>

      <form
        v-if="products.length && user"
        class="mt-12"
        @submit.prevent="handlePayment(products, user)"
      >
        <section aria-labelledby="cart-heading">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul
            role="list"
            class="divide-y divide-gray-200 border-t border-b border-gray-200"
          >
            <li v-for="product in products" :key="product.id" class="flex py-6">
              <div class="flex-shrink-0">
                <img
                  :src="product.images[0]"
                  :alt="product.title"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-24 sm:w-24"
                >
              </div>

              <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div class="flex justify-between">
                    <h4 class="text-sm">
                      <a
                        :href="product.id"
                        class="font-medium text-gray-700 hover:text-gray-800"
                        >{{ product.title }}</a
                      >
                    </h4>
                    <p class="ml-4 text-sm font-medium text-gray-900">
                      ${{ (product.price * product.quantity).toFixed(2) }}
                    </p>
                  </div>
                  <div class="flex justify-between">
                    <p class="mt-1 text-sm font-medium text-gray-500">
                      Shop: {{ product.shopName }}
                    </p>
                    <p class="mt-1 text-sm font-medium text-gray-500">
                      Unit: ${{ product.price }}
                    </p>
                  </div>
                </div>

                <div class="mt-4 flex flex-1 items-end justify-between">
                  <div class="flex items-center space-x-2">
                    <button
                      type="button"
                      class="h-8 w-8 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                      @click="decreaseQuantity(product.id)"
                    >
                      -
                    </button>
                    <span class="px-2 text-sm font-medium text-gray-900">{{
                      product.quantity
                    }}</span>
                    <button
                      type="button"
                      class="h-8 w-8 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                      @click="increaseQuantity(product.id)"
                    >
                      +
                    </button>
                  </div>
                  <div class="ml-4">
                    <button
                      type="button"
                      class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      @click="removeProduct(product.id)"
                    >
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading" class="mt-10">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <div>
            <dl class="space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-base font-medium text-gray-900">Subtotal</dt>
                <dd class="ml-4 text-base font-medium text-gray-900">
                  ${{ totalPrice.toFixed(2) }}
                </dd>
              </div>
            </dl>
            <p class="mt-1 text-sm text-gray-500">
              Shipping and taxes will be calculated at checkout.
            </p>
          </div>

          <div class="mt-10">
            <button
              type="submit"
              class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none"
            >
              Checkout
            </button>
          </div>

          <div class="mt-6 text-center text-sm">
            <p>
              or{{ " " }}
              <a
                href="/"
                class="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </a>
            </p>
          </div>
        </section>
      </form>
      <div v-else class="mt-12">
        <div class="flex items-center justify-center">
          <NoSymbolIcon class="h-16 w-16 text-gray-400" aria-hidden="true" />
        </div>
        <p class="mt-4 text-center text-sm font-medium text-gray-900">
          Your cart is empty
        </p>
        <p class="mt-1 text-center text-sm text-gray-500">
          Start shopping to find amazing products!
        </p>
        <div class="mt-6 flex justify-center">
          <NuxtLink
            to="/products"
            class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
            >Continue Shopping</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NoSymbolIcon } from "@heroicons/vue/24/outline";
import { useCartStore } from "@/stores/cart";
import { loadStripe } from "@stripe/stripe-js";
import type { User } from "@prisma/client";
import type { CartItem } from "~/stores/cart";

const config = useRuntimeConfig();
const stripePromise = loadStripe(
  config.public.STRIPE_PUBLISHABLE_KEY as string,
);

const toast = useToast();

const userStore = useUserStore();
const user = computed(() => userStore.user);

const cartStore = useCartStore();
const products = computed(() => cartStore.cart);
const totalPrice = computed(() => cartStore.totalPrice);

onMounted(() => {
  cartStore.initializeCart();
});

const removeProduct = (id: string) => {
  cartStore.removeFromCart(id);
};

const increaseQuantity = (id: string) => {
  cartStore.increaseQuantity(id);
};

const decreaseQuantity = (id: string) => {
  cartStore.decreaseQuantity(id);
};

const handlePayment = async (products: CartItem[], user: User) => {
  const stripe = await stripePromise;
  if (!stripe) {
    toast.add({
      title: "Stripe Initialization Error",
      description: "Failed to initialize Stripe. Please try again later.",
      color: "error",
    });
    return;
  }
  if (!user) {
    toast.add({
      title: "Authentication Required",
      description: "Please sign in to proceed with payment.",
      color: "warning",
    });
    return navigateTo("/sign-in");
  }
  try {
    const response = await $fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { products, name: user.name, email: user.email },
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

definePageMeta({
  layout: "dashboard",
});
</script>

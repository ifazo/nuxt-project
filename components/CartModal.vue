<template>
  <div>
    <Popover class="text-sm lg:relative">
      <PopoverButton class="group -m-2 flex items-center p-2">
        <ShoppingBagIcon
          class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span
          class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
        >
          {{ products.length }}
        </span>
        <span class="sr-only">items in cart, view bag</span>
      </PopoverButton>
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <PopoverPanel
          class="lg:ring-opacity-5 absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:top-full lg:right-0 lg:left-auto lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black"
        >
          <h2 class="sr-only">Shopping Cart</h2>

          <form v-if="products.length" class="mx-auto max-w-2xl px-4">
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="product in products"
                :key="product.id"
                class="flex items-center py-6"
              >
                <img
                  :src="product.images[0]"
                  :alt="product.title"
                  class="h-16 w-16 flex-none rounded-md border border-gray-200"
                >
                <div class="mx-2 flex-auto">
                  <h3
                    class="flex items-center justify-between font-medium text-gray-900"
                  >
                    <NuxtLink :to="product.id" class="truncate">{{
                      product.title
                    }}</NuxtLink>
                    <button
                      type="button"
                      class="ml-4 rounded bg-red-50 px-2 py-1 shadow-sm hover:bg-red-100"
                      @click="removeProduct(product.id)"
                    >
                      <TrashIcon
                        class="h-5 w-5 text-red-400 hover:text-red-500"
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div class="mt-1 flex">
                    <p class="font-medium text-gray-500">
                      $ {{ (product.price * product.quantity).toFixed(2) }}
                    </p>
                    <p class="ml-auto font-medium text-gray-500">
                      Qty: {{ product.quantity }}
                    </p>
                  </div>
                </div>
              </li>
            </ul>

            <button
              type="submit"
              class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-none"
              @click.prevent="handlePayment(products, user)"
            >
              Checkout ${{ totalPrice.toFixed(2) }}
            </button>

            <p class="mt-6 text-center">
              <a
                href="#"
                class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >View Shopping Bag</a
              >
            </p>
          </form>

          <div
            v-else
            class="flex h-48 items-center justify-center text-gray-400"
          >
            <NoSymbolIcon class="h-6 w-6" aria-hidden="true" />
            <p class="ml-2 text-sm font-medium text-gray-500">
              Your cart is empty
            </p>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import {
  NoSymbolIcon,
  ShoppingBagIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { useCartStore } from "@/stores/cart";
import { loadStripe } from "@stripe/stripe-js";
import type { User } from "@prisma/client";
import type { CartItem } from "~/stores/cart";

const config = useRuntimeConfig();
const stripePromise = loadStripe(
  config.public.STRIPE_PUBLISHABLE_KEY as string,
);

const toast = useToast();

const cartStore = useCartStore();
const products = computed(() => cartStore.cart);
const totalPrice = computed(() => cartStore.totalPrice);

onMounted(() => {
  cartStore.initializeCart();
});

const removeProduct = (id: string) => {
  cartStore.removeFromCart(id);
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

defineProps({
  user: {
    type: Object as () => User,
    default: null,
  },
});
</script>

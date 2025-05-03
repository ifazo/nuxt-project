<template>
  <div class="bg-white">
    <div class="py-8 sm:py-12">
      <div class="max-w-xl">
        <h1
          id="your-orders-heading"
          class="text-3xl font-bold tracking-tight text-gray-900"
        >
          Your Orders
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          All your orders and returns are listed here.
        </p>
      </div>

      <div v-if="orders" class="mt-6 space-y-8">
        <section
          v-for="order in orders"
          :key="order.id"
          :aria-labelledby="`${order.id}-heading`"
        >
          <div
            class="space-y-1 md:flex md:items-baseline md:space-y-0 md:space-x-4"
          >
            <h2
              :id="`${order.id}-heading`"
              class="text-lg font-medium text-gray-900 md:flex-shrink-0"
            >
              Order #{{ order.id }}
            </h2>
            <div
              class="space-y-5 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 md:min-w-0 md:flex-1"
            >
              <p class="text-sm font-medium text-gray-500">
                {{ order.status }}
              </p>
              <div class="flex text-sm font-medium">
                <a
                  :href="order.id"
                  class="text-indigo-600 hover:text-indigo-500"
                  >Manage order</a
                >
                <div class="ml-4 border-l border-gray-200 pl-4 sm:ml-6 sm:pl-6">
                  <a
                    :href="order.id"
                    class="text-indigo-600 hover:text-indigo-500"
                    >View Invoice</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div
            class="mt-6 -mb-6 flow-root divide-y divide-gray-200 border-t border-gray-200"
          >
            <div
              v-for="product in order?.products"
              :key="product.id"
              class="py-6 sm:flex"
            >
              <div
                class="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8"
              >
                <img
                  :src="product.images[0]"
                  :alt="product.title"
                  class="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-24 sm:w-24"
                >
                <div class="min-w-0 flex-1 pt-1.5 sm:pt-0">
                  <h3 class="font-medium text-gray-900">
                    {{ product.title }}
                  </h3>
                  <p class="truncate text-sm font-medium text-gray-500">
                    <span>${{ product.price }}</span>
                    {{ " " }}
                    <span
                      class="mx-1 text-sm font-medium text-gray-400"
                      aria-hidden="true"
                      >&middot;</span
                    >
                    {{ " " }}
                    <span>Qty: {{ product.quantity }}</span>
                  </p>
                  <p class="mt-1 text-sm font-medium text-gray-900">
                    {{
                      product.description.length > 200
                        ? product.description.substring(0, 200) + "..."
                        : product.description
                    }}
                  </p>
                </div>
              </div>
              <div class="mt-6 space-y-4 sm:mt-0 sm:ml-6 sm:w-40 sm:flex-none">
                <button
                  type="button"
                  class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none sm:w-full sm:flex-grow-0"
                >
                  Buy again
                </button>
                <button
                  type="button"
                  class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none sm:w-full sm:flex-grow-0"
                >
                  View product
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div v-else class="mt-6">
        <p class="text-sm text-gray-500">No orders found.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Order, Product } from "@prisma/client";

type OrderProduct = Order & {
  products: Product[];
};

const userStore = useUserStore();
const user = computed(() => userStore.user);
const orders = ref<OrderProduct[] | null>([]);

onMounted(async () => {
  if (!user.value) {
    return;
  }
  const data = await $fetch<OrderProduct[]>("/api/orders", {
    method: "GET",
    headers: {
      "user-email": user.value?.email,
    },
  });
  orders.value = data;
});

definePageMeta({
  layout: "dashboard",
});
</script>

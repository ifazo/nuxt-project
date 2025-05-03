import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Product } from "@prisma/client";

export type CartItem = Product & {
  quantity: number;
};

export const useCartStore = defineStore("cart", () => {
  const cart = ref<CartItem[]>([]);

  const totalPrice = computed(() =>
    cart.value.reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  function addToCart(item: Product, quantity: number) {
    const existingItem = cart.value.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.value.push({ ...item, quantity: quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }

  function removeFromCart(id: string) {
    cart.value = cart.value.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart.value));
  }

  function clearCart() {
    cart.value = [];
    localStorage.removeItem("cart");
  }

  function initializeCart() {
    const storedCart = localStorage.getItem("cart");
    cart.value = storedCart ? JSON.parse(storedCart) : [];
  }

  return {
    cart,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    initializeCart,
  };
});

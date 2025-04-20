<template>
  <div>
    <h1>Shops</h1>
    <p>Welcome to the shops page!</p>
    <UButton
      label="Create your shop"
      color="neutral"
      variant="outline"
      class="flex w-md items-center justify-center text-center"
      @click="open = true"
    />
    <ShopFormModal v-model:open="open" />
  </div>
</template>

<script setup lang="ts">
import ShopFormModal from "~/components/ShopFormModal.vue";

const open = ref(false);

definePageMeta({
  layout: "dashboard",
});
</script>

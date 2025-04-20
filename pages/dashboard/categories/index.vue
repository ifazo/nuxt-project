<template>
  <div>
    <h1>Categories</h1>
    <p>Welcome to the categories page!</p>
    <UButton
      label="Add new category"
      color="neutral"
      variant="outline"
      class="flex w-md items-center justify-center text-center"
      @click="open = true"
    />
    <CategoryFormModal v-model:open="open" />
  </div>
</template>

<script setup lang="ts">
import CategoryFormModal from "~/components/CategoryFormModal.vue";

const open = ref(false);

definePageMeta({
  layout: "dashboard",
});
</script>

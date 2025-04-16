<template>
  <div>
    <p>Dashboard page</p>
  </div>
</template>

<script setup lang="ts">
import { getCurrentUser } from "~/lib/firebase";

definePageMeta({
  layout: "dashboard",
  middleware: async function () {
    const user = await getCurrentUser();
    const toast = useToast();

    if (!user) {
      toast.add({
        title: "Authentication Required",
        description: "Please sign in to access Dashboard page.",
        color: "warning",
      });
      return navigateTo("/sign-in");
    }
  },
});
</script>

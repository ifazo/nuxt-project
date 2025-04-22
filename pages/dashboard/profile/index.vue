<template>
  <div v-if="user">
    <h3>Profile</h3>
    <p>User profile information will be displayed here.</p>
    <p>{{ user.name }}</p>
    <p>{{ user.email }}</p>
    <img :src="user.image ?? ''" alt="" >
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const user = computed(() => userStore.user);

onMounted(() => {
  userStore.initializeUser();
});

definePageMeta({
  layout: "dashboard",
});
</script>

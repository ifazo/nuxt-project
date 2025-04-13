<template>
  <div>
    <BlogForm />
  </div>
</template>

<script setup lang="ts">
import BlogForm from "~/components/BlogForm.vue";

definePageMeta({
  layout: "dashboard",
});
</script>

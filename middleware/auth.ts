import { useUserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  const user = computed(() => userStore.user);

  onMounted(() => {
    userStore.initializeUser();
  });

  if (!user.value) {
    return navigateTo("/sign-in");
  }

  const roleRoutes = {
    BUYER: [
      "/dashboard",
      "/dashboard/blogs",
      "/dashboard/orders",
      "/dashboard/profile",
    ],
    SELLER: [
      "/dashboard",
      "/dashboard/products",
      "/dashboard/shops",
      "/dashboard/profile",
    ],
    ADMIN: [
      "/dashboard",
      "/dashboard/blogs",
      "/dashboard/categories",
      "/dashboard/profile",
    ],
  };

  const allowedRoutes =
    roleRoutes[user.value?.role as keyof typeof roleRoutes] || [];

  const isAllowed = allowedRoutes.some((route) => to.path.startsWith(route));

  if (!isAllowed) {
    return navigateTo("/dashboard");
  }
});

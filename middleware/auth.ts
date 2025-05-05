export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;

  const userStore = useUserStore();
  await userStore.initializeUser();

  const user = userStore.user;
  if (!user) {
    return await navigateTo("/sign-in");
  }

  const roleRoutes = {
    BUYER: [
      "/dashboard",
      "/dashboard/cart",
      "/dashboard/wishlist",
      "/dashboard/orders",
    ],
    SELLER: ["/dashboard", "/dashboard/products", "/dashboard/shops"],
    ADMIN: ["/dashboard", "/dashboard/blogs", "/dashboard/categories"],
  };

  const allowedRoutes = roleRoutes[user.role as keyof typeof roleRoutes] || [];

  const isAllowed = allowedRoutes.some((route) => to.path.startsWith(route));

  if (!isAllowed) {
    return await navigateTo("/dashboard");
  }
});

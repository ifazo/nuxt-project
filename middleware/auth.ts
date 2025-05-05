export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();

  if (import.meta.server) return;

  await userStore.initializeUser();
  const user = userStore.user;

  if (!user) {
    return await navigateTo("/sign-in");
  }

  const roleRoutes = {
    BUYER: ["/dashboard/cart", "/dashboard/wishlist", "/dashboard/orders"],
    SELLER: ["/dashboard/products", "/dashboard/shops"],
    ADMIN: ["/dashboard/blogs", "/dashboard/categories"],
  };

  const fallbackRoutes = {
    BUYER: "/dashboard/cart",
    SELLER: "/dashboard/products",
    ADMIN: "/dashboard/blogs",
  };

  const allowedRoutes = roleRoutes[user.role as keyof typeof roleRoutes] || [];

  const isAllowed = allowedRoutes.some((route) => to.path.startsWith(route));

  if (!isAllowed) {
    return await navigateTo(fallbackRoutes[user.role as keyof typeof fallbackRoutes] || "/");
  }
});

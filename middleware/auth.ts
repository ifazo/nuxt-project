export default defineNuxtRouteMiddleware(async (to) => {

  const userStore = useUserStore();
  await userStore.initializeUser();

  const user = userStore.user;

  if (!user) {
    return navigateTo("/sign-in");
  }

  const roleRoutes = {
    BUYER: [
      "/dashboard",
      "/dashboard/cart",
      "/dashboard/wishlist",
      "/dashboard/orders",
    ],
    SELLER: [
      "/dashboard",
      "/dashboard/products",
      "/dashboard/shops",
    ],
    ADMIN: [
      "/dashboard",
      "/dashboard/blogs",
      "/dashboard/categories",
    ],
  };

  const allowedRoutes =
    roleRoutes[user?.role as keyof typeof roleRoutes] || [];

  const isAllowed = allowedRoutes.some((route) => to.path.startsWith(route));

  if (!isAllowed) {
    return navigateTo("/");
  }
});

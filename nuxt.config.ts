import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
  ],
  image: {
    dir: "assets/images",
    domains: ["https://tailwindui.com"],
  },
  runtimeConfig: {
    // Private variables (server-side only)
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    // Public variables (client-side and server-side)
    public: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    },
  },
  googleFonts: {
    families: {
      Roboto: [400, 500, 700],
    },
    display: "swap",
  },
});

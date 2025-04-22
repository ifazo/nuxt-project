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
    domains: [
      "https://tailwindui.com",
      "https://i.ibb.co.com",
      "https://lh3.googleusercontent.com",
    ],
  },
  runtimeConfig: {
    // Private variables (server-side only)
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    // Public variables (client-side and server-side)
    public: {
      STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
  googleFonts: {
    families: {
      Roboto: [400, 500, 700],
    },
    display: "swap",
  },
});

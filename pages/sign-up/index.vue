<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    -->
  <div class="flex min-h-full flex-1">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Logo"
          >
          <h2
            class="mt-8 text-2xl leading-9 font-bold tracking-tight text-gray-900"
          >
            Sign up for new account
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Already a member?
            {{ " " }}
            <NuxtLink
              to="/sign-in"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Sign in to your account</NuxtLink
            >
          </p>
        </div>

        <div class="mt-10">
          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200" />
            </div>
            <div
              class="relative flex justify-center text-sm leading-6 font-medium"
            >
              <span class="bg-white px-6 text-gray-900"
                >Choose account type</span
              >
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent"
              :class="{ 'ring-indigo-600': form.role === 'BUYER' }"
              @click="form.role = 'BUYER'"
            >
              <GiftIcon class="h-5 w-5" aria-hidden="true" />
              <span class="text-sm leading-6 font-semibold">Buyer</span>
            </button>

            <button
              type="button"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent"
              :class="{ 'ring-indigo-600': form.role === 'SELLER' }"
              @click="form.role = 'SELLER'"
            >
              <BanknotesIcon class="h-5 w-5" aria-hidden="true" />
              <span class="text-sm leading-6 font-semibold">Seller</span>
            </button>
          </div>
        </div>

        <div class="mt-10">
          <div>
            <form class="space-y-6" @submit.prevent="submitForm">
              <div>
                <label
                  for="name"
                  class="block text-sm leading-6 font-medium text-gray-900"
                  >Full Name</label
                >
                <div class="mt-2">
                  <input
                    id="name"
                    v-model="form.name"
                    name="name"
                    type="text"
                    autocomplete="name"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                </div>
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm leading-6 font-medium text-gray-900"
                  >Email address</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    v-model="form.email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                </div>
              </div>

              <div>
                <label
                  for="password"
                  class="block text-sm leading-6 font-medium text-gray-900"
                  >Password</label
                >
                <div class="mt-2">
                  <input
                    id="password"
                    v-model="form.password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  >
                  <label
                    for="remember-me"
                    class="ml-3 block text-sm leading-6 text-gray-700"
                    >Remember me</label
                  >
                </div>

                <div class="text-sm leading-6">
                  <NuxtLink
                    to="/forget-password"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                    >Forgot password?</NuxtLink
                  >
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm leading-6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { signUp } from "@/lib/firebase";
import { useUserStore } from "@/stores/user";
import { BanknotesIcon, GiftIcon } from "@heroicons/vue/24/outline";

const toast = useToast();

const userStore = useUserStore();

const form = ref({
  role: "BUYER",
  name: "",
  email: "",
  password: "",
});

const submitForm = () => {
  handleSignUp();
};

const handleSignUp = () => {
  const { role, name, email, password } = form.value;
  signUp(email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      userStore.setUser(user);

      await $fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          role: role,
          name: name,
          email: email,
          password: password,
        },
      });

      toast.add({
        title: "Success",
        description: "User created successfully",
        color: "success",
      });
      navigateTo("/");
    })
    .catch((err) => {
      toast.add({
        title: "Error",
        description: err.message,
        color: "error",
      });
    });
};
</script>

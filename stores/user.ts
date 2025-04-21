import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@prisma/client";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  function setUser(userData: User) {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function removeUser() {
    user.value = null;
    localStorage.removeItem("user");
  }

  function initializeUser() {
    const storedUser = localStorage.getItem("user");
    user.value = JSON.parse(storedUser as string);
  }

  return { user, setUser, removeUser, initializeUser };
});

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:size-10"
                  >
                    <ShoppingBagIcon
                      class="h-6 w-6 text-indigo-700"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold text-gray-900"
                    >
                      Create new category
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Create a new category to organize your products.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="mt-6">
                  <div class="mb-4">
                    <label
                      for="name"
                      class="mb-2 block text-sm font-medium text-gray-700"
                      >Name</label
                    >
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="Enter category name"
                      required
                    >
                  </div>

                  <div class="mb-4">
                    <label
                      for="details"
                      class="mb-2 block text-sm font-medium text-gray-700"
                      >Details</label
                    >
                    <textarea
                      id="details"
                      v-model="form.details"
                      rows="4"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="Enter category details"
                      required
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      for="icon"
                      class="block text-sm font-medium text-gray-700"
                      >Icon</label
                    >
                    <div
                      class="mt-2 grid max-h-64 grid-cols-4 gap-4 overflow-y-auto"
                    >
                      <div
                        v-for="(icon, index) in availableIcons"
                        :key="index"
                        class="flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 p-2 hover:border-indigo-500"
                        :class="form.icon === icon ? 'border-indigo-500' : ''"
                        @click="selectIcon(icon)"
                      >
                        <img
                          :src="`https://api.iconify.design/lucide:${icon}.svg`"
                          :alt="icon"
                          class="h-8 w-8"
                        >
                      </div>
                    </div>
                    <!-- <p class="mt-2 text-sm text-gray-500">
                      Select an icon for the category.
                    </p> -->
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  @click.prevent="handleSubmit"
                >
                  Submit
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  @click.prevent="closeModal"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useUserStore } from "@/stores/user";
import { ShoppingBagIcon } from "@heroicons/vue/24/outline";
import lucideIcons from "@iconify-json/lucide/icons.json";

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:open"]);

const toast = useToast();
const userStore = useUserStore();

const form = ref({
  name: "",
  details: "",
  icon: null,
});

const availableIcons = lucideIcons?.icons ? Object.keys(lucideIcons.icons) : [];

const selectIcon = (icon) => {
  form.value.icon = icon;
};

const closeModal = () => {
  emit("update:open", false);
  form.value.name = "";
  form.value.details = "";
  form.value.icon = null;
};

const handleSubmit = async () => {
  try {
    if (!userStore.user) {
      toast.add({
        title: "Authentication Required",
        description: "Please sign in to create a category.",
        color: "warning",
      });
      return navigateTo("/sign-in");
    }

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-email": userStore.user.email,
      },
      body: JSON.stringify({
        icon: form.value.icon,
        name: form.value.name,
        details: form.value.details,
      }),
    });

    if (!response.ok) {
      toast.add({
        title: "Error",
        description: response.statusText || "Failed to create category",
        color: "error",
      });
      return;
    }

    toast.add({
      title: "Success",
      description: "Category created successfully",
      color: "success",
    });

    closeModal();
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.add({
      title: "Error",
      description: "Failed to create category",
      color: "error",
    });
  }
};
</script>

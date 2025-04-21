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
                      Create your shop
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Create your shop and start selling your products.
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
                      placeholder="Summarize your experience"
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
                      placeholder="Tell about your shop"
                      required
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      for="logo"
                      class="block text-sm/6 font-medium text-gray-900"
                      >Icon</label
                    >
                    <div
                      class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4"
                    >
                      <div class="text-center">
                        <div v-if="previewImage">
                          <img
                            :src="previewImage"
                            alt="Logo Preview"
                            class="mx-auto h-24 w-24 rounded object-cover"
                          >
                        </div>
                        <div v-else>
                          <PhotoIcon
                            class="mx-auto size-12 text-gray-300"
                            aria-hidden="true"
                          />
                        </div>
                        <div class="mt-4 flex text-sm/6 text-gray-600">
                          <label
                            for="file-upload"
                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              class="sr-only"
                              required
                              @change="handleFileChange"
                            >
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs/5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
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

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { useUserStore } from "@/stores/user";
import { PhotoIcon, ShoppingBagIcon } from "@heroicons/vue/24/outline";

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:open"]);

const toast = useToast();
const userStore = useUserStore();

const previewImage = ref<string | null>(null);

const form = ref<{
  name: string;
  logo: File | null;
  details: string;
}>({
  name: "",
  logo: null,
  details: "",
});

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    form.value.logo = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const closeModal = () => {
  emit("update:open", false);
  form.value.name = "";
  form.value.details = "";
  form.value.logo = null;
  previewImage.value = null;
};

const handleSubmit = async () => {
  try {
    if (!userStore.user) {
      toast.add({
        title: "Authentication Required",
        description: "Please sign in to post a review.",
        color: "warning",
      });
      return navigateTo("/sign-in");
    }

    let logoUrl = "";
    if (form.value.logo) {
      const formData = new FormData();
      formData.append("image", form.value.logo);

      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=187d3aec661ecb2f9b3fa1a76eab6014`,
        {
          method: "POST",
          body: formData,
        },
      );

      const imgbbData = await imgbbResponse.json();

      if (imgbbData.success) {
        logoUrl = imgbbData.data.url;
      } else {
        throw new Error("Failed to upload logo to ImgBB");
      }
    }

    const response = await fetch("/api/shops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logo: logoUrl,
        name: form.value.name,
        details: form.value.details,
        userEmail: userStore.user.email,
      }),
    });
    console.log("Shop response:", response);
    if (response.ok === false) {
      toast.add({
        title: "Error",
        description: response.statusText || "Failed to create shop",
        color: "error",
      });
      return;
    }
    toast.add({
      title: "Success",
      description: "Shop created successfully",
      color: "success",
    });
    form.value.name = "";
    form.value.details = "";
    form.value.logo = null;
    previewImage.value = null;
    closeModal();
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.add({
      title: "Error",
      description: "Failed to create shop",
      color: "error",
    });
  }
};
</script>

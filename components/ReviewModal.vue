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
                    class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:size-10"
                  >
                    <StarIcon
                      class="size-6 text-yellow-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-base font-semibold text-gray-900"
                      >Leave a Review</DialogTitle
                    >
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Share your experience with our product. Your feedback
                        helps us improve.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="mt-6">
                  <!-- Star Rating -->
                  <div class="mb-4">
                    <label class="mb-2 block text-sm font-medium text-gray-700"
                      >Rating</label
                    >
                    <div class="flex space-x-2">
                      <button
                        v-for="i in 5"
                        :key="i"
                        type="button"
                        class="focus:outline-none"
                        @click="rating = i"
                      >
                        <StarIcon
                          :class="[
                            'size-8',
                            i <= rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-200',
                          ]"
                        />
                      </button>
                    </div>
                  </div>

                  <!-- Title Input -->
                  <div class="mb-4">
                    <label
                      for="review-title"
                      class="mb-2 block text-sm font-medium text-gray-700"
                      >Title</label
                    >
                    <input
                      id="review-title"
                      v-model="title"
                      type="text"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="Summarize your experience"
                      required
                    />
                  </div>

                  <!-- Description Input -->
                  <div class="mb-4">
                    <label
                      for="review-description"
                      class="mb-2 block text-sm font-medium text-gray-700"
                      >Description</label
                    >
                    <textarea
                      id="review-description"
                      v-model="description"
                      rows="4"
                      class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      placeholder="Tell us more about your experience"
                      required
                    />
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                  @click.prevent="submitReview"
                >
                  Submit Review
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
import { StarIcon } from "@heroicons/vue/20/solid";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  blogId: {
    type: String,
    required: true,
  },
  open: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:open"]);

const toast = useToast();
const userStore = useUserStore();

const rating = ref(0);
const title = ref("");
const description = ref("");

const closeModal = () => {
  emit("update:open", false);
};

const submitReview = async () => {
  const response = await fetch("/api/blogs/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      blogId: props.blogId,
      rating: rating.value,
      title: title.value,
      description: description.value,
      userEmail: userStore.user.email,
    }),
  });
  console.log("blog review response:", response);
  if (!response.ok) {
    toast.add({
      title: "Error",
      description: "Failed to post review",
      color: "error",
    });
  } else {
    toast.add({
      title: "Success",
      description: "Review posted successfully",
      color: "success",
    });
  }
  rating.value = 0;
  title.value = "";
  description.value = "";
  closeModal();
};
</script>

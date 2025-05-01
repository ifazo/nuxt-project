<template>
  <div class="flex items-start space-x-4">
    <div v-if="user && user.image" class="flex-shrink-0">
      <img
        class="inline-block h-10 w-10 rounded-full"
        :src="user.image"
        alt=""
      >
    </div>
    <UserCircleIcon v-else class="h-10 w-10 flex-shrink-0 text-gray-400" />
    <div class="min-w-0 flex-1">
      <form action="#" class="relative">
        <div
          class="overflow-hidden rounded-lg shadow-sm ring-1 ring-gray-300 ring-inset focus-within:ring-2 focus-within:ring-indigo-600"
        >
          <label for="comment" class="sr-only">Add your comment</label>
          <textarea
            id="comment"
            v-model="form.comment"
            rows="3"
            name="comment"
            required
            class="block w-full resize-none border-0 bg-transparent px-3 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
            placeholder="Add your comment..."
          />
          <!-- Spacer element to match the height of the toolbar -->
          <div class="py-2" aria-hidden="true">
            <div class="py-px">
              <div class="h-9" />
            </div>
          </div>
        </div>

        <div class="absolute inset-x-0 bottom-0 flex justify-between p-2">
          <div class="flex items-center space-x-5">
            <!-- 5-Star Rating -->
            <div class="flex items-center">
              <template v-for="star in 5" :key="star">
                <button
                  type="button"
                  :class="
                    star <= form.rating ? 'text-yellow-400' : 'text-gray-300'
                  "
                  class="h-6 w-6"
                  required
                  @click="setRating(star)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="none"
                    class="h-5 w-5"
                  >
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                </button>
              </template>
            </div>
          </div>
          <div class="flex-shrink-0">
            <button
              type="submit"
              class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click.prevent="submitReview"
            >
              Review
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserCircleIcon } from "@heroicons/vue/24/outline";
import { useUserStore } from "@/stores/user";

const props = defineProps({
  blogId: {
    type: String,
    required: true,
  },
});

const toast = useToast();

const userStore = useUserStore();
const user = computed(() => userStore.user);

onMounted(() => {
  userStore.initializeUser();
});

const form = ref({
  rating: 0,
  comment: "",
});

const setRating = (value: number) => {
  form.value.rating = value;
};

const submitReview = async () => {
  if (!user.value || !user.value.email) {
    toast.add({
      title: "Authentication Required",
      description: "Please sign in to post a review.",
      color: "warning",
    });
    return navigateTo("/sign-in");
  }
  const response = await fetch("/api/blogs/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "user-email": user.value.email,
      "blog-id": props.blogId,
    },
    body: JSON.stringify({
      rating: form.value.rating,
      comment: form.value.comment,
    }),
  });
  // console.log("blog review response:", response);
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
  form.value.rating = 0;
  form.value.comment = "";
};
</script>

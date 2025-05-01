<template>
  <div>
    <div class="border-b border-gray-200">
      <h3 class="my-4 text-sm font-medium text-gray-700">Blog reviews</h3>
    </div>
    <div v-if="reviews.length" class="-mb-10">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="flex space-x-4 text-sm text-gray-500"
      >
        <div class="flex-none py-10">
          <img
            v-if="review.user.image"
            :src="review.user.image"
            alt=""
            class="h-10 w-10 rounded-full bg-gray-100"
          >
          <UserCircleIcon
            v-else
            class="h-10 w-10 rounded-full bg-gray-100"
            aria-hidden="true"
          />
        </div>
        <div
          :class="[
            Number(review.id) === 0 ? '' : 'border-t border-gray-200',
            'py-10',
          ]"
        >
          <h3 class="font-medium text-gray-900">
            {{ review.user.name }}
          </h3>
          <p>
            <time
              :datetime="
                review.createdAt ? review.createdAt.toString() : undefined
              "
              >{{ review.createdAt ? review.createdAt.toString() : "" }}</time
            >
          </p>

          <div class="mt-4 flex items-center">
            <StarIcon
              v-for="rating in [0, 1, 2, 3, 4]"
              :key="rating"
              :class="[
                review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                'h-5 w-5 flex-shrink-0',
              ]"
              aria-hidden="true"
            />
          </div>
          <p class="sr-only">{{ review.rating }} out of 5 stars</p>

          <p class="prose prose-sm mt-4 max-w-none text-gray-500">
            {{ review.comment }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="flex items-center justify-center py-10">
      <p class="text-sm text-gray-500">No reviews yet.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarIcon } from "@heroicons/vue/20/solid";
import { UserCircleIcon } from "@heroicons/vue/24/outline";
import type { BlogReview, User } from "@prisma/client";

type Review = BlogReview & {
  user: User;
};

const props = defineProps({
  blogId: {
    type: String,
    required: true,
  },
});

const reviews = ref<Review[]>([]);
const emit = defineEmits(["update-reviews"]);

onMounted(async () => {
  const response = await fetch(`/api/blogs/reviews?blogId=${props.blogId}`);
  if (response.ok) {
    reviews.value = await response.json();
    const reviewLength = reviews.value.length;
    const averageRating =
      reviewLength > 0
        ? (
            reviews.value.reduce((acc, review) => acc + review.rating, 0) /
            reviewLength
          ).toFixed(1)
        : "0.0";
    emit("update-reviews", { reviewLength, averageRating });
  } else {
    console.error("Failed to fetch reviews");
  }
});
</script>

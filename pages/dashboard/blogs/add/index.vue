<template>
  <form>
    <div class="mt-8 space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base/7 font-semibold text-gray-900">Blog</h2>
        <p class="mt-1 text-sm/6 text-gray-600">
          Put your blog information here. Make sure to include a title and a
          content with photo...
        </p>

        <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label for="title" class="block text-sm/6 font-medium text-gray-900"
              >Title</label
            >
            <div class="mt-2">
              <div
                class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
              >
                <div
                  class="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
                >
                  Blog:
                </div>
                <input
                  id="title"
                  v-model="form.title"
                  type="text"
                  name="title"
                  class="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                  placeholder="Title..."
                >
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="description"
              class="block text-sm/6 font-medium text-gray-900"
              >Description</label
            >
            <div class="mt-2">
              <textarea
                id="description"
                v-model="form.description"
                name="description"
                rows="2"
                placeholder="Write the main theme..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label class="block text-sm/6 font-medium text-gray-900"
              >Content</label
            >
            <div class="mt-2">
              <ClientOnly>
                <TheQuill v-model="form.content" />
              </ClientOnly>
            </div>
            <p class="mt-3 text-sm/6 text-gray-600">
              {{ form.content.length }} characters
            </p>
          </div>

          <div class="col-span-full">
            <label
              for="cover-photo"
              class="block text-sm/6 font-medium text-gray-900"
              >Cover photo</label
            >
            <div
              class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            >
              <div class="text-center">
                <div v-if="form.photo">
                  <img
                    :src="previewImage"
                    alt="Image Preview"
                    class="mx-auto h-24 w-24 rounded-md object-cover"
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
                      @change="handleFileChange"
                    >
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <!-- <button type="button" class="text-sm/6 font-semibold text-gray-900">
        Cancel
      </button> -->
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-8 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click.prevent="handleSubmit"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup>
import { PhotoIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";

const toast = useToast();

const previewImage = ref(null);

const form = ref({
  title: "",
  description: "",
  content: "",
  image: null,
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.value.photo = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const handleSubmit = async () => {
  try {
    let imageUrl = "";
    if (form.value.photo) {
      const formData = new FormData();
      formData.append("image", form.value.photo);

      const imgbbResponse = await fetch(
        `https://api.imgbb.com/1/upload?key=187d3aec661ecb2f9b3fa1a76eab6014`,
        {
          method: "POST",
          body: formData,
        },
      );

      const imgbbData = await imgbbResponse.json();

      if (imgbbData.success) {
        imageUrl = imgbbData.data.url;
      } else {
        console.error("Image upload failed:", imgbbData);
        return;
      }
    }

    const response = await $fetch("/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        title: form.value.title,
        description: form.value.description,
        content: form.value.content,
        image: imageUrl,
        userId: "bbb232f6-cba8-4108-99ef-9f5368d0333f",
      },
    });
    console.log("Blog created successfully:", response);
    toast.add({
      title: "Success",
      description: "Blog created successfully",
      color: "success",
    });
    form.value.title = "";
    form.value.content = "";
    form.value.photo = null;
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.add({
      title: "Error",
      description: "Failed to create blog",
      color: "error",
    });
  }
};

definePageMeta({
  layout: "dashboard",
});
</script>

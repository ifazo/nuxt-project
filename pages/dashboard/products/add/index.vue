<template>
  <form>
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 py-4">
        <h2 class="text-base/7 font-semibold text-gray-900">Product</h2>
        <p class="mt-1 text-sm/6 text-gray-600">
          Provide the details of your product.
        </p>
      </div>

      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label for="title" class="block text-sm/6 font-medium text-gray-900"
              >Title</label
            >
            <div class="mt-2">
              <input
                id="title"
                v-model="form.title"
                type="text"
                name="title"
                placeholder="Product name..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
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
                placeholder="Write a few sentences about your product..."
                rows="3"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="price" class="block text-sm/6 font-medium text-gray-900"
              >Price</label
            >
            <div class="mt-2">
              <input
                id="price"
                v-model="form.price"
                type="number"
                min="0"
                step="0.01"
                name="price"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="stock" class="block text-sm/6 font-medium text-gray-900"
              >Stock</label
            >
            <div class="mt-2">
              <input
                id="stock"
                v-model="form.stock"
                type="number"
                min="0"
                name="stock"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="images"
              class="block text-sm/6 font-medium text-gray-900"
              >Photos</label
            >
            <div class="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-4">
              <!-- Photo Input -->
              <div
                v-for="(image, index) in form.images"
                :key="index"
                class="relative flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
              >
                <div class="text-center">
                  <img
                    v-if="image.preview"
                    :src="image.preview"
                    alt="Preview"
                    class="mx-auto h-12 w-12 rounded object-cover"
                  >
                  <PhotoIcon
                    v-else
                    class="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div class="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      :for="'file-upload-' + index"
                      class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        :id="'file-upload-' + index"
                        type="file"
                        class="sr-only"
                        @change="handleFileChange($event, index)"
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

          <div class="sm:col-span-3">
            <label
              for="category"
              class="block text-sm/6 font-medium text-gray-900"
              >Category</label
            >
            <div class="mt-2 grid grid-cols-1">
              <select
                id="category"
                v-model="form.category"
                name="category"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
              <ChevronDownIcon
                class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                aria-hidden="true"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="shop" class="block text-sm/6 font-medium text-gray-900"
              >Shop</label
            >
            <div class="mt-2 grid grid-cols-1">
              <select
                id="shop"
                v-model="form.shop"
                name="shop"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
              <ChevronDownIcon
                class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                aria-hidden="true"
              />
            </div>
          </div>

          <div class="sm:col-span-2 sm:col-start-1">
            <label
              for="highlight-1"
              class="block text-sm/6 font-medium text-gray-900"
              >Highlight 1</label
            >
            <div class="mt-2">
              <input
                id="highlight-1"
                v-model="form.highlights[0]"
                type="text"
                name="highlight-1"
                placeholder="Highlight 1..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="highlight-2"
              class="block text-sm/6 font-medium text-gray-900"
              >Highlight 2</label
            >
            <div class="mt-2">
              <input
                id="highlight-2"
                v-model="form.highlights[1]"
                type="text"
                name="highlight-2"
                placeholder="Highlight 2..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="highlight-3"
              class="block text-sm/6 font-medium text-gray-900"
              >Highlight 3</label
            >
            <div class="mt-2">
              <input
                id="highlight-3"
                v-model="form.highlights[2]"
                type="text"
                name="highlight-3"
                placeholder="Highlight 3..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-2 sm:col-start-1">
            <label
              for="highlight-4"
              class="block text-sm/6 font-medium text-gray-900"
              >Highlight 4</label
            >
            <div class="mt-2">
              <input
                id="highlight-4"
                v-model="form.highlights[3]"
                type="text"
                name="highlight-4"
                placeholder="Highlight 4..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="highlight-5"
              class="block text-sm/6 font-medium text-gray-900"
              >Highlight 5</label
            >
            <div class="mt-2">
              <input
                id="highlight-5"
                v-model="form.highlights[4]"
                type="text"
                name="highlight-5"
                placeholder="Highlight 5..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="highlight-6"
              class="block text-sm/6 font-medium text-gray-900"
              >Highlight 6</label
            >
            <div class="mt-2">
              <input
                id="highlight-6"
                v-model="form.highlights[5]"
                type="text"
                name="highlight-6"
                placeholder="Highlight 6..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-1 sm:col-start-1">
            <label for="tag-1" class="block text-sm/6 font-medium text-gray-900"
              >Tag 1</label
            >
            <div class="mt-2">
              <input
                id="tag-1"
                v-model="form.tags[0]"
                type="text"
                name="tag-1"
                placeholder="Tag 1..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-1">
            <label for="tag-2" class="block text-sm/6 font-medium text-gray-900"
              >Tag 2</label
            >
            <div class="mt-2">
              <input
                id="tag-2"
                v-model="form.tags[1]"
                type="text"
                name="tag-2"
                placeholder="Tag 2..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-1">
            <label for="tag-3" class="block text-sm/6 font-medium text-gray-900"
              >Tag 3</label
            >
            <div class="mt-2">
              <input
                id="tag-3"
                v-model="form.tags[2]"
                type="text"
                name="tag-3"
                placeholder="Tag 3..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-1">
            <label for="tag-4" class="block text-sm/6 font-medium text-gray-900"
              >Tag 4</label
            >
            <div class="mt-2">
              <input
                id="tag-4"
                v-model="form.tags[3]"
                type="text"
                name="tag-4"
                placeholder="Tag 4..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-1">
            <label for="tag-5" class="block text-sm/6 font-medium text-gray-900"
              >Tag 5</label
            >
            <div class="mt-2">
              <input
                id="tag-5"
                v-model="form.tags[4]"
                type="text"
                name="tag-5"
                placeholder="Tag 5..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>

          <div class="sm:col-span-1">
            <label for="tag-6" class="block text-sm/6 font-medium text-gray-900"
              >Tag 6</label
            >
            <div class="mt-2">
              <input
                id="tag-6"
                v-model="form.tags[5]"
                type="text"
                name="tag-6"
                placeholder="Tag 6..."
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" class="text-sm/6 font-semibold text-gray-900">
        Cancel
      </button>
      <button
        type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        @click.prevent="handleSubmit"
      >
        Post
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { PhotoIcon } from "@heroicons/vue/24/solid";
import { ChevronDownIcon } from "@heroicons/vue/16/solid";
import { ref } from "vue";

const toast = useToast();

const form = ref({
  title: "",
  images: [
    { file: null as File | null, preview: null as string | null },
    { file: null as File | null, preview: null as string | null },
    { file: null as File | null, preview: null as string | null },
    { file: null as File | null, preview: null as string | null },
  ],
  description: "",
  highlights: [],
  price: "",
  stock: "",
  tags: [],
  category: "",
  shop: "",
});

const handleFileChange = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement;
  if (target && target.files) {
    const file = target.files[0];
    if (file) {
      form.value.images[index] = {
        file,
        preview: URL.createObjectURL(file),
      };
    }
  }
};

const handleSubmit = async () => {
  try {
    console.log("Form submitted:", form.value);

    const uploadedImages = [];
    for (const image of form.value.images) {
      if (image.file) {
        const formData = new FormData();
        formData.append("image", image.file);

        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=187d3aec661ecb2f9b3fa1a76eab6014`,
          {
            method: "POST",
            body: formData,
          },
        );

        const imgbbData = await imgbbResponse.json();
        if (imgbbData.success) {
          uploadedImages.push(imgbbData.data.url);
        } else {
          console.error("Image upload failed:", imgbbData);
          return;
        }
      }
    }

    const response = await $fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        title: form.value.title,
        images: uploadedImages,
        description: form.value.description,
        highlights: form.value.highlights,
        price: form.value.price,
        stock: form.value.stock,
        tags: form.value.tags,
        category: form.value.category,
        shop: form.value.shop,
      },
    });
    console.log("Blog created successfully:", response);
    toast.add({
      title: "Success",
      description: "Blog created successfully",
      color: "success",
    });
    form.value.title = "";
    form.value.description = "";
    form.value.price = "";
    form.value.stock = "";
    form.value.highlights = [];
    form.value.tags = [];
    form.value.category = "";
    form.value.shop = "";
    form.value.images = [
      { file: null, preview: null },
      { file: null, preview: null },
      { file: null, preview: null },
      { file: null, preview: null },
    ];
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

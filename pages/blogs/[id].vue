<template>
  <div class="bg-white py-8">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row"
      >
        <div class="w-full lg:max-w-4xl lg:flex-auto">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            We’re always looking for awesome people to join us
          </h2>
          <p class="mt-6 text-xl leading-8 text-gray-600">
            Diam nunc lacus lacus aliquam turpis enim. Eget hac velit est
            euismod lacus. Est non placerat nam arcu. Cras purus nibh cursus sit
            eu in id.
          </p>
          <img
            src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1344&h=1104&q=80"
            alt=""
            class="mt-8 aspect-[6/5] w-full rounded-2xl bg-gray-50 object-cover lg:aspect-auto lg:h-[34.5rem]"
          >
        </div>
        <div class="w-full lg:max-w-md lg:flex-auto">
          <h3 class="py-8 text-2xl leading-7 font-bold text-indigo-600">
            Related products
          </h3>
          <ul class="-my-4 divide-y divide-gray-100">
            <li v-for="product in products" :key="product.id" class="py-4">
              <div class="flex items-start gap-4">
                <!-- Product Image -->
                <img
                  :src="product.image"
                  alt="Product Image"
                  class="h-24 w-24 rounded-md object-cover"
                >
                <dl class="relative flex flex-wrap gap-x-3">
                  <dt class="sr-only">Role</dt>
                  <dd
                    class="w-full flex-none text-lg font-semibold tracking-tight text-gray-900"
                  >
                    <a :href="product.href">
                      {{ product.role }}
                      <span class="absolute inset-0" aria-hidden="true" />
                    </a>
                  </dd>
                  <dt class="sr-only">Description</dt>
                  <dd
                    class="mt-2 w-full flex-none text-base leading-7 text-gray-600"
                  >
                    {{ product.description }}
                  </dd>
                  <dt class="sr-only">Salary</dt>
                  <dd
                    class="mt-2 text-base leading-7 font-semibold text-gray-900"
                  >
                    {{ product.salary }}
                  </dd>
                  <dt class="sr-only">Location</dt>
                  <dd
                    class="mt-2 flex items-center gap-x-3 text-base leading-7 text-gray-500"
                  >
                    <svg
                      viewBox="0 0 2 2"
                      class="h-0.5 w-0.5 flex-none fill-gray-300"
                      aria-hidden="true"
                    >
                      <circle cx="1" cy="1" r="1" />
                    </svg>
                    {{ product.location }}
                  </dd>
                </dl>
              </div>
            </li>
          </ul>
          <div class="my-4 flex border-t border-gray-100 pt-4">
            <NuxtLink
              :to="'/products'"
              class="text-sm leading-6 font-semibold text-indigo-600 hover:text-indigo-500"
              >View all products <span aria-hidden="true">&rarr;</span>
            </NuxtLink>
          </div>
        </div>
      </div>
      <p class="mt-8 text-base leading-7 text-gray-600">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas voluptas
        provident velit fugiat odit? Minima ducimus totam eaque cumque rem,
        inventore aliquam consectetur repudiandae sequi quasi quod perspiciatis
        labore nihil? Nostrum sapiente odio magnam ullam quia non fugit,
        quisquam explicabo voluptatem. Dicta atque beatae sunt deserunt impedit
        saepe quod voluptates tempore aspernatur expedita doloremque qui, ea ad
        esse ducimus cumque! Temporibus aliquam repudiandae modi perspiciatis,
        soluta, nobis minus fuga magnam cupiditate ipsum nostrum animi quos
        recusandae aperiam, omnis nesciunt. Nostrum eligendi deserunt
        doloremque, tempora impedit dicta hic dolorum voluptatibus fugit.
        Provident nesciunt a odio amet non exercitationem. Corrupti a nemo est
        labore voluptates, excepturi, dolores autem, magnam quidem alias
        accusamus perspiciatis. Obcaecati ipsum modi nemo provident qui officia,
        repudiandae veniam! Impedit minima dolor quasi, nostrum rerum eos nihil
        quidem cum dolores similique accusamus blanditiis nulla delectus natus
        voluptatum exercitationem beatae. Placeat reiciendis corrupti officia
        error magni, voluptates et eveniet vero. Cum beatae repellendus rerum,
        blanditiis libero quisquam eligendi aperiam, praesentium numquam sit
        provident ipsum officiis et? At odio temporibus quaerat beatae expedita
        consequuntur! Nihil consequuntur expedita asperiores cupiditate enim
        eveniet. Laboriosam quisquam obcaecati minus optio vero, odit nostrum
        temporibus debitis culpa cum voluptates aliquid asperiores iure,
        consequuntur corrupti consequatur ex vitae, adipisci saepe magni esse
        at. Illo quia voluptatum necessitatibus. Ut quia necessitatibus
        architecto perspiciatis, delectus, praesentium obcaecati tempore
        molestiae, deserunt reprehenderit nam eligendi impedit voluptatum!
        Repellat veritatis sequi fuga fugit, non, similique obcaecati quidem
        quod officiis reprehenderit, maiores porro. Molestias inventore eius
        natus nulla aspernatur deleniti praesentium, tempore quam doloremque non
        excepturi accusamus tempora officia blanditiis quisquam provident dolore
        iusto eos nostrum? Molestiae maiores quo consequuntur non? Magnam,
        eveniet. Magnam ipsum quis saepe fugiat in unde esse quisquam laborum
        odio eos corrupti neque voluptas nisi, ipsam doloremque deleniti
        assumenda animi hic cumque rerum iste laudantium rem eum commodi!
        Temporibus!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const products = [
  {
    id: 1,
    role: "Full-time designer",
    href: "#",
    image:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-01.jpg",
    description:
      "Quos sunt ad dolore ullam qui. Enim et quisquam dicta molestias.",
    salary: "$75,000 USD",
    location: "San Francisco, CA",
  },
  {
    id: 2,
    role: "Laravel developer",
    href: "#",
    image:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-02.jpg",
    description:
      "Et veniam et officia dolorum rerum. Et voluptas consequatur magni sapiente.",
    salary: "$125,000 USD",
    location: "San Francisco, CA",
  },
  {
    id: 3,
    role: "React Native developer",
    href: "#",
    image:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-03.jpg",
    description:
      "Veniam ipsam nisi quas architecto eos non voluptatem in nemo.",
    salary: "$105,000 USD",
    location: "San Francisco, CA",
  },
  {
    id: 4,
    role: "React Native developer",
    href: "#",
    image:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-feature-03-detail-04.jpg",
    description:
      "Veniam ipsam nisi quas architecto eos non voluptatem in nemo.",
    salary: "$105,000 USD",
    location: "San Francisco, CA",
  },
];
</script>

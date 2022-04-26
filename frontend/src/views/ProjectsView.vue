<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Your projects</h3>
    <div class="flex flex-col">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="
            inline-block
            min-w-full
            overflow-hidden
            align-middle
            sm:rounded-lg
          "
        >
          <div
            class="
              max-w-2xl
              mx-auto
              py-16
              px-4
              sm:py-24 sm:px-6
              lg:max-w-7xl lg:px-8
            "
          >
            <div
              class="
                grid grid-cols-1
                gap-y-10
                sm:grid-cols-2
                gap-x-6
                lg:grid-cols-3
                xl:grid-cols-4 xl:gap-x-8
              "
            >
              <router-link to="/projects/project"
                v-for="project in projects"
                :key="project.id"
                :href="project.href"
                class="group"
              >
                <div
                  class="
                    w-full
                    aspect-w-1 aspect-h-1
                    bg-gray-200
                    rounded-lg
                    overflow-hidden
                    xl:aspect-w-7 xl:aspect-h-8
                  "
                >
                  <img
                    :src="project.imageSrc"
                    :alt="project.imageAlt"
                    class="
                      w-full
                      h-full
                      object-center object-cover
                      group-hover:opacity-75
                    "
                  />
                </div>
                <h3 class="mt-4 text-sm text-gray-700 mb-0 font-bold">
                  {{ project.title }}
                </h3>
                <p class="text-sm text-gray-700 font-normal">
                  {{ project.deadline }}
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const projects = [
  {
    id: 1,
    title: "UX design of something",
    href: "#",
  deadline: '10/10/2020',
    imageSrc: "https://picsum.photos/200",
    imageAlt: "Something",
  },
  {
    id: 2,
    title: "New project wow!",
    href: "#",
   deadline: '10/10/2020',
    imageSrc: "https://picsum.photos/200",
    imageAlt: "Something",
  },
  {
    id: 3,
    title: "This is something cool",
    href: "#",
   deadline: '10/10/2020',
    imageSrc: "https://picsum.photos/200",
    imageAlt: "Something",
  },
  {
    id: 4,
    title: "You won't bellieve what happened next!",
    href: "#",
    deadline: '10/10/2020',
    imageSrc: "https://picsum.photos/200",
    imageAlt: "Something",
  },
];

export default {
  setup() {
    return {
      projects,
    };
  },
};
</script>





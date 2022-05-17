<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Projects</h3>
    <div class="mt-8"></div>
    <h4 class="text-1xl font-bold text-gray-700">All projects</h4>

    <router-link to="/projects/new-project">
      <button
        type="button"
        class="button w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        Create project
      </button>
    </router-link>

    <div class="flex flex-col mt-8">
      <div
        class="inline-block min-w-full overflow-hidden align-middle sm:rounded-lg"
      >
        <div
          class="max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <Suspense>
            <template #default>
              <ProjectsCard />
            </template>
            <template #fallback> Loading... </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectsCard from '../components/ProjectsCard.vue';

// tailwind

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    ProjectsCard,
  },
});
</script>

<style lang="scss" scoped></style>

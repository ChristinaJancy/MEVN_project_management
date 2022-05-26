<template>
  <h3 class="text-3xl font-bold text-gray-700">All projects</h3>
  <div class="mt-8"></div>

  <router-link to="/projects/new-project">
    <button
      type="button"
      class="button w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
    >
      Create project
    </button>
  </router-link>

  <div class="flex flex-col mt-8">
    <div
      class="inline-block min-w-full overflow-hidden align-middle sm:rounded-lg"
    >
      <div
        class=""
      >
        <Suspense>
          <template #default>
            <ProjectsCard />
          </template>
          <template #fallback>
            <LoadingCenter />
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProjectsCard from '../components/ProjectsCard.vue';
import LoadingCenter from '../components/animations/LoadingCenter.vue';
// tailwind

export default defineComponent({
  setup() {
    return {};
  },
  components: {
    ProjectsCard,
    LoadingCenter,
  },
});
</script>

<style lang="scss" scoped></style>

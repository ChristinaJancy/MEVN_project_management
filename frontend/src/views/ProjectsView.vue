<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Projects</h3>
    <div class="mt-8"></div>
    <h4 class="text-1xl font-bold text-gray-700">Your projects</h4>
    <div class="flex flex-col mt-8">
      <div
        class="
          inline-block
          min-w-full
          overflow-hidden
          align-middle
          sm:rounded-lg
        "
      >
        <div class="max-w-2xl mx-auto lg:max-w-7xl">
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
import { defineComponent } from "vue";
import ProjectsCard from "../components/ProjectsCard.vue";

// tailwind

export default defineComponent({
  setup() {},
  components: {
    ProjectsCard,
  },
});
</script>

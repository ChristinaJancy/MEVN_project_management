<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Dashboard</h3>
    <div class="mt-8 flex flex-wrap space-y-10 md:space-y-0 md:space-x-5">
      <!-- Projects -->
      <div
        class="bg-gray-100 max-w-full w-full md:w-5/12 md:max-w-2xl p-4 rounded-lg space-y-3 shadow-lg"
      >
        <Suspense>
          <template #default>
            <DashboardUserProjects />
          </template>
          <template #fallback>
            <LoadingCard :title="'Your projects'" />
          </template>
        </Suspense>
      </div>

      <!-- tasks -->
      <div
        class="bg-gray-100 max-w-full w-full md:w-5/12 md:max-w-2xl p-4 rounded-lg space-y-3 shadow-lg"
      >
        <Suspense>
          <template #default>
            <DashboardUserTasks />
          </template>
          <template #fallback>
            <LoadingCard :title="'Your tasks'" />
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DashboardUserTasks from '../components/DashboardUserTasks.vue';
import DashboardUserProjects from '../components/DashboardUserProjects.vue';
import LoadingCard from '../components/animations/LoadingCard.vue';
export default defineComponent({
  components: {
    DashboardUserTasks,
    DashboardUserProjects,
    LoadingCard,
  },
});
</script>

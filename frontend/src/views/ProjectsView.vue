<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Projects</h3>
    <div class="mt-8"></div>
    <h4 class="text-1xl font-bold text-gray-700">Your projects</h4>
    <div class="flex flex-col mt-8">
      <div
        class="inline-block min-w-full overflow-hidden align-middle sm:rounded-lg"
      >
        <div class="max-w-2xl mx-auto lg:max-w-7xl">
          <Suspense>
            <template #default>
              <ProjectsCard @click="EditProjectDetails()" />
            </template>
            <template #fallback> Loading... </template>
          </Suspense>
        </div>
      </div>
    </div>
    <!-- task modal -->
    <EditProjectDetails :show="showModal" @close-modal="showModal = false" />
  </div>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue';
import EditProjectDetails from '../components/EditProjectDetails.vue';
import ProjectsCard from '../components/ProjectsCard.vue';

// tailwind

export default defineComponent({
  setup() {
    const showModal = ref(false);
    onMounted(() => {});

    return { showModal };
  },
  components: {
    EditProjectDetails,
    ProjectsCard,
  },
  methods: {
    EditProjectDetails() {
      this.showModal = true;
    },
  },
});
</script>

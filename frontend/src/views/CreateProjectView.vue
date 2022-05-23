<template>
  <h3 class="text-3xl font-medium text-center text-gray-700">Create a new project</h3>
  <div class="mt-8"></div>
  <div class="">
    <div class="mt-5 md:mt-0 mx-auto" style="max-width: 600px;">
      <!-- form -->
      <Suspense>
        <template #default>
          <CreateProjectForm />
        </template>
        <template #fallback>
          <LoadingCard :title="''" />
        </template>
      </Suspense>
      <!-- /form end -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateProjectForm from '../components/forms/CreateProjectForm.vue';
import LoadingCard from '../components/animations/LoadingCard.vue';
// tailwind
export default defineComponent({
  components: {
    CreateProjectForm,
    LoadingCard,
  },
  setup() {},
  methods: {},
});
</script>

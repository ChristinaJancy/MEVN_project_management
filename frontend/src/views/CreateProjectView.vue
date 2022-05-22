<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Create a new project</h3>
    <div class="mt-8"></div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <!-- form -->
        <Suspense>
          <template #default>
            <CreateProjectForm />
          </template>
          <template #fallback> loading... </template>
        </Suspense>
        <!-- /form end -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateProjectForm from '../components/forms/CreateProjectForm.vue';

// tailwind
export default defineComponent({
  components: {
    CreateProjectForm,
  },
  setup() {},
  methods: {},
});
</script>

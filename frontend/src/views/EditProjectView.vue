<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <Suspense>
      <template #default>
        <EditProject />
      </template>
      <template #fallback>
        <LoadingCenter />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import EditProject from '../components/forms/EditProjectForm.vue';
import LoadingCenter from '../components/animations/LoadingCenter.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    EditProject,
    LoadingCenter,

  },
});
</script>

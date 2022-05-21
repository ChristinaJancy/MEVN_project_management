<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <Suspense>
      <template #default>
        <EditTaskForm />
      </template>
      <template #fallback> loading... </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import EditTaskForm from '../components/EditTaskForm.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    EditTaskForm,
  },
});
</script>

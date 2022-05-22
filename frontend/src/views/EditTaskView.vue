<template>
  <h3 class="text-3xl font-medium text-center text-gray-700">
    Update task info✍️(◔◡◔)
  </h3>
  <div class="mt-8"></div>
  <div class="">
    <div class="mt-5 md:mt-0 mx-auto" style="max-width: 600px">
      <Suspense>
        <template #default>
          <EditTaskForm />
        </template>
        <template #fallback>
          <LoadingCenter />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script lang="ts">
import EditTaskForm from '../components/forms/EditTaskForm.vue';
import LoadingCenter from '../components/animations/LoadingCenter.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    EditTaskForm,
    LoadingCenter,
  },
});
</script>

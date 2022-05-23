<template>
  <h3 class="text-3xl text-gray-700">Create a new role</h3>
  <div class="mt-8"></div>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:mt-0 md:col-span-2">
      <!-- form -->
      <Suspense>
        <template #default>
          <CreateRoleForm />
        </template>
        <template #fallback>
          <LoadingCenter />
        </template>
      </Suspense>
      <!-- /form end -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateRoleForm from '../components/forms/CreateRoleForm.vue';
import LoadingCenter from '../components/animations/LoadingCenter.vue';

// tailwind
export default defineComponent({
  components: {
    CreateRoleForm,
    LoadingCenter
  },
});
</script>

<template>
  <h3 class="text-3xl text-gray-700">Create a new template</h3>
  <div class="mt-8"></div>
  <div class="md:grid md:grid-cols-3 md:gap-6">
    <div class="mt-5 md:mt-0 md:col-span-2">
      <!-- form -->
      <Suspense>
        <template #default>
          <CreateTemplateForm />
        </template>
        <template #fallback> loading... </template>
      </Suspense>
      <!-- /form end -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateTemplateForm from '../components/forms/CreateTemplateForm.vue';

// tailwind
export default defineComponent({
  components: {
    CreateTemplateForm,
  },
  setup() {},
  methods: {},
});
</script>

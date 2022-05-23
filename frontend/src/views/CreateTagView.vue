<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Create a new tag</h3>
    <div class="mt-8"></div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="mt-5 md:mt-0 md:col-span-2">
        <!-- form -->
        <Suspense>
          <template #default>
            <CreateTagForm />
          </template>
          <template #fallback> 
            <LoadingCenter />
          </template>
        </Suspense>
        <!-- /form end -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CreateTagForm from '../components/forms/CreateTagForm.vue';
import LoadingCenter from '../components/animations/LoadingCenter.vue';


// tailwind
export default defineComponent({
  components: {
    CreateTagForm,
    LoadingCenter
  },
  setup() {},
  methods: {},
});
</script>

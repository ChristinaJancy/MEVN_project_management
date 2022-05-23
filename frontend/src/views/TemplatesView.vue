<template>
  <h3 class="text-3xl font-medium text-gray-700">Templates</h3>
  <div class="mt-8"></div>
  <h4 class="text-1xl font-bold text-gray-700">All templates</h4>
  <Suspense>
    <template #default>
      <!-- All roles table -->
      <TemplatesTable />
    </template>
    <template #fallback>
      <LoadingTable />
    </template>
  </Suspense>
</template>

<script lang="ts">
import TemplatesTable from '../components/TemplatesTable.vue';
import LoadingTable from '../components/animations/LoadingTable.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    TemplatesTable,
    LoadingTable,
  },

  setup() {
    return {};
  },
});
</script>

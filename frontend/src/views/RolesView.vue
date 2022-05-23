<template>
  <div>
    <h3 class="text-3xl text-gray-700">All roles</h3>
    <div class="mt-8"></div>
    <Suspense>
      <template #default>
        <!-- All roles table -->
        <RolesTable />
      </template>
      <template #fallback>
        <LoadingTable />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import RolesTable from '../components/RolesTable.vue';
import LoadingTable from '../components/animations/LoadingTable.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    RolesTable,
    LoadingTable,
  },

  setup() {
    return {};
  },
});
</script>

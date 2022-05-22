<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Roles</h3>
    <div class="mt-8"></div>
    <h4 class="text-1xl font-bold text-gray-700">All roles</h4>
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

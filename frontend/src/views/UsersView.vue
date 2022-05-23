<template>
  <div>
    <h3 class="text-3xl text-gray-700">All members</h3>
    <!-- All users table -->
    <Suspense>
      <template #default>
        <UsersTable />
      </template>
      <template #fallback>
        <LoadingTable />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import UsersTable from '../components/UsersTable.vue';
import LoadingTable from '../components/animations/LoadingTable.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    UsersTable,
    LoadingTable,
  },

  setup() {
    return {};
  },
});
</script>
